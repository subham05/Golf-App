import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/dimen';
import Button from '../../components/Button';
import * as Progress from 'react-native-progress';
import _, {round} from 'lodash';
import Realm from 'realm';
import {useIsFocused} from '@react-navigation/native';
import ByteBuffer from 'bytebuffer';
import {BleContext} from '../../utils/helpers/BleBoundary';
import showErrorAlert from '../../utils/helpers/Toast';
var CRC32 = require('crc-32');
let status = '';
let realm = new Realm({path: 'Powakaddy.realm'});
global.packetCount = 0;
export default function Updatingfirmware(props) {
  const progressBarRef = useRef(null);
  const {byteArray} = props.route.params;
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));

  const [paired, setPaired] = useState(1);
  const [progValue, setProgValue] = useState(0);
  const [DBstatus, setDBstatus] = useState(true);
  const context = useContext(BleContext);
  const isFocused = useIsFocused();

  console.log('----');
  let dataPacketSize = deviceObj[0]?.mtu - 3;
  console.log('-----datapacketSize', dataPacketSize);
  let fwPayloadSize1 = dataPacketSize - 4;
  //? --------------- DB Status change -------------------------
  useEffect(() => {
    if (isFocused) {
      try {
        realm.addListener('change', onRealmChange);
      } catch (error) {
        console.error(
          `An exception was thrown within the change listener: ${error}`,
        );
      }
      return () => {
        realm.removeListener('change', onRealmChange);
      };
    }
  }, [isFocused]);
  function onRealmChange() {
    setTimeout(() => {
      // getDeviceAllStatus(global.Allproducts);
      console.log('Changes are done');
      if (device_all?.length !== 0) {
        if (device_all[0].status == false) {
          setDBstatus(false);
        } else {
          setDBstatus(true);
        }
      }
    }, 1000);
    console.log('DB+++++++', typeof device_all[0].status, DBstatus);
  }
  //? --------------- Back Handler -------------------------
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        props.navigation.navigate('SupportScreen');
        return true;
      },
    );

    return () => backHandler.remove();
  }, [props.navigation]);
  //? --------------- Update Start -------------------------
  useEffect(() => {
    if (isFocused && !_.isEmpty(byteArray)) {
      setTimeout(() => UpdateFW(byteArray), 2000);
    }
  }, [isFocused, byteArray]);

  // ! ------------------- Updating Start From here----------------------
  const UpdateFW = byteArr => {
    let FWHeaderArr = getFWUpdateHeader(byteArr);

    console.log('HEADER, ', FWHeaderArr);

    if (!_.isEmpty(FWHeaderArr)) {
      writeFWHeaderPacket(FWHeaderArr, byteArr, deviceObj[0]?.id);
    }
  };

  //? --------------- Get Header Structure -------------------------
  const getFWUpdateHeader = byteArr => {
    let totalSize = byteArr.length;

    let crc = CRC32.buf(byteArr);

    const bb = new ByteBuffer(36, ByteBuffer.LITTLE_ENDIAN);
    bb.writeInt(0);
    bb.writeInt(totalSize);
    bb.writeInt(0);
    bb.writeInt(crc);
    bb.writeByte(0x02);
    bb.writeByte(0x46);
    bb.writeByte(0x57);
    bb.writeByte(0x5f);
    bb.writeByte(0x41);
    bb.writeByte(0x50);
    bb.writeByte(0x50);
    bb.writeByte(0x2e);
    bb.writeByte(0x62);
    bb.writeByte(0x69);
    bb.writeByte(0x6e);
    bb.writeByte(0x00);
    bb.writeByte(0x00);
    bb.writeByte(0x00);
    bb.writeByte(0x00);
    bb.writeInt(crc);

    var byteArray = new Uint8Array(bb.buffer);

    var array = Array.from(byteArray);
    return array;
  };
  //? --------------- Get Header Structure -------------------------

  // * ----------------- Header Packet Write -------------------------
  const writeFWHeaderPacket = (header, arr, id) => {
    let serviceUUID = '9A87CD30-C747-11ED-A901-0800200C9A66';
    let characteristicUUID = '9A87CD31-C747-11ED-A901-0800200C9A66';

    if (deviceObj[0]?.id !== null) {
      context.writeWithoutResponse(
        id,
        serviceUUID,
        characteristicUUID,
        header,
        header.length,
        res => {
          if (res) {
            writeFWdataPackets(arr, id);
          }
        },
      );
    } else {
      showErrorAlert('Internal system error ==> 1');
    }
  };
  // * ----------------- Header Packet Write -------------------------

  // ? -------------------- Data Packet ------------------------------

  function getTotalPacketCount(courseDataSize, fwPayloadSize) {
    let division = Math.floor(courseDataSize / fwPayloadSize);
    let remainder = (courseDataSize + 1) % fwPayloadSize;

    if (remainder == 0) {
      //let _totalPacketCount = _division + 1;
      return 0 + division;
    } else {
      return 1 + division;
    }
  }

  const writeFWdataPackets = (array, id) => {
    let packetNumber = 1;
    let totalPacketsCount = getTotalPacketCount(array.length, 72);

    // _totalPacketCount.current = totalPacketsCount;

    console.log('TOtal Packet', totalPacketsCount);
    const newBB = new ByteBuffer(76, ByteBuffer.LITTLE_ENDIAN);

    setTimeout(() => {
      writeFWPacketOneByOne(
        array,
        newBB,
        0,
        packetNumber,
        totalPacketsCount,
        id,
      );
    }, 30);
  };
  // ? -------------------- Data Packet ------------------------------

  // * -------------------- One by One Packet ------------------------
  const writeFWPacketOneByOne = (
    FWBytes,
    bb,
    cursonPositionIn,
    packetNumberIn,
    totalPacketCounts,
    id,
  ) => {
    let curPosition = cursonPositionIn;
    let packetNumber = packetNumberIn;

    // _PacketCount.current = packetNumber;

    // console.log('ONE by ONE ==== >', id);

    if (curPosition < FWBytes.length) {
      bb.clear();
      bb.writeShort(packetNumber);
      bb.writeShort(0);
      let j = 4;

      while (j < 76 && curPosition < FWBytes.length) {
        bb.writeByte(FWBytes[curPosition]);
        j++;
        curPosition++;
      }

      let _array = new Uint8Array(bb.clone().buffer);
      let clone_array = Array.from(_array);

      // console.log('clone_array', clone_array);

      const animationWidth = parseInt(
        packetNumber > 0 && totalPacketCounts > 0
          ? (packetNumber / totalPacketCounts) * 100
          : 0,
      );
      let widthStr = animationWidth.toString();
      updateProgress(widthStr);
      writeFWdataPacket(clone_array, id, res => {
        if (res) {
          let currentDelay = packetNumber % 64 == 0 ? 60 : 50;
          ++packetNumber;

          if (packetNumber < totalPacketCounts) {
            setTimeout(() => {
              writeFWPacketOneByOne(
                FWBytes,
                bb,
                curPosition,
                packetNumber,
                totalPacketCounts,
                id,
              );
            }, 40);
          } else {
            setTimeout(() => {
              writeFWLastPacket(
                FWBytes,
                curPosition,
                packetNumber,
                totalPacketCounts,
                id,
              );
            }, 40);
          }
        } else {
          showErrorAlert('Internal system error');
        }
      });
    }
  };
  // * -------------------- One by One Packet ------------------------

  // ? --------------------- Write FW Data Packet ---------------------
  const writeFWdataPacket = (packet, id, callback = () => {}) => {
    let serviceUUID = '9A87CD30-C747-11ED-A901-0800200C9A66';
    let characteristicUUID = '9A87CD31-C747-11ED-A901-0800200C9A66';

    context.writeWithoutResponse(
      id,
      serviceUUID,
      characteristicUUID,
      packet,
      packet.length,
      res => {
        callback(res);
      },
    );
  };
  // ? --------------------- Write FW Data Packet ---------------------

  // * --------------------- Write Last Packet ------------------------
  const writeFWLastPacket = (
    FWBytes,
    cursonPositionIn,
    packetNumberIn,
    totalPacketCount,
    id,
  ) => {
    const bb = new ByteBuffer(
      FWBytes.length - cursonPositionIn + 4,
      ByteBuffer.LITTLE_ENDIAN,
    );
    let cursorPosition = cursonPositionIn;
    let packetNumber = packetNumberIn;

    // _PacketCount.current = packetNumberIn;

    if (cursorPosition < FWBytes.length) {
      bb.clear();
      bb.writeShort(packetNumber);
      bb.writeShort(0);
      let j = 4;

      while (j < 76 && cursorPosition < FWBytes.length) {
        bb.writeByte(FWBytes[cursorPosition]);
        j++;
        cursorPosition++;
      }

      let _array = new Uint8Array(bb.clone().buffer);
      let clone_array = Array.from(_array);

      console.log('clone_array', clone_array);

      writeFWdataPacket(clone_array, id, res => {
        if (res) {
          let currentDelay = packetNumber % 64 == 0 ? 60 : 50;
          ++packetNumber;

          if (packetNumber < totalPacketCount) {
            setTimeout(() => {
              writeFWPacketOneByOne(
                FWBytes,
                bb,
                cursorPosition,
                packetNumber,
                totalPacketCount,
                id,
              );
            }, 40);
          } else {
            setTimeout(() => {
              writeFWLastPacket(
                FWBytes,
                cursorPosition,
                packetNumber,
                totalPacketCount,
                id,
              );
            }, 40);
          }
        } else {
          showErrorAlert('Internal system error');
        }
      });
    } else {
      if (cursorPosition == FWBytes.length) {
        setProgValue(1);
        console.log('Firmware Update Success');
        // setTimeout(() =>
        //   props.navigation.navigate('Firmwareupdatesuccessfully', 1000),
        // );
      }
    }
  };
  const updateProgress = wid => {
    console.log('----width===============', wid);
    if (progressBarRef.current) {
      progressBarRef.current.setNativeProps({
        style: {width: `${wid}%`, backgroundColor: Colors.yellow},
      });
    }
  };
  // * --------------------- Write Last Packet ------------------------

  // ! ------------------- Updating End to here----------------------

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
  const fadeInValue = new Animated.Value(0);
  Animated.sequence([
    Animated.delay(100),
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <MyStatusBar backgroundColor={Colors.black} />
      {progValue == 1 ? (
        <View style={styles.parentview1}>
          <View
            style={{
              width: '100%',
              height: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SupportScreen')}
              style={styles.backview}>
              <Image source={Icons.downarrow} style={styles.backimg} />
            </TouchableOpacity>
            <Image source={Icons.logo} style={styles.logoview} />
          </View>
          <View style={styles.mainview}>
            {/* <ScrollView> */}
            <View>
              <View style={styles.bodyimgview}>
                <Image source={Icons.firmwareupdate} style={styles.bodyimg} />
              </View>
              <Text style={styles.txtfirmwareupdate}>
                Firmware Update Successfully
              </Text>
              <Text style={styles.txtbody}>
                {'The software update has been transferred to your trolley.'}
              </Text>
            </View>
            <View
              style={{marginBottom: normalize(40), marginTop: normalize(30)}}>
              <Button
                backgroundColor={Colors.yellow}
                title={'DONE'}
                marginTop={normalize(10)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoMedium}
                fontSize={normalize(14)}
                fontWeight="500"
                letterSpacing={2}
                onPress={() => props.navigation.navigate('SupportScreen')}
              />
            </View>
            {/* </ScrollView> */}
          </View>
        </View>
      ) : (
        <View style={styles.parentview}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {DBstatus == false ? (
              <Animated.View
                style={[
                  styles.animate,
                  {
                    borderColor: Colors.red,
                    transform: [{scale: fadeInValue}],
                    opacity: fadeInValue,
                  },
                ]}></Animated.View>
            ) : (
              <Animated.Image
                style={{
                  width: normalize(250),
                  height: normalize(250),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  transform: [{rotate: spin}],
                }}
                source={Icons.spin}
              />
            )}

            <Image
              source={Icons.spinLogo}
              style={{
                position: 'absolute',
                width: normalize(160),
                height: normalize(160),
                resizeMode: 'contain',
                alignSelf: 'center',
                tintColor: DBstatus == false ? Colors.white : null,
              }}
            />
          </View>
          <View>
            <Text style={styles.txtpowakaddy}>
              {DBstatus == false ? 'Update Not Complete' : 'Updating Firmware'}
            </Text>
            <Text style={styles.txtdeviceconnect}>
              {DBstatus == false
                ? 'Your Device is Not Connected'
                : 'Your Device is Connected'}
            </Text>
          </View>

          {/* <Image
          source={Icons.pairingprogress}
          style={{width: '100%', height: normalize(2), resizeMode: 'stretch'}}
        /> */}
          <View style={styles.progressContain}>
            {DBstatus == true && (
              <View
                style={{
                  width: '100%',
                  height: normalize(2),
                  backgroundColor: Colors.darkGrey,
                  marginTop: normalize(8),
                  marginBottom: normalize(10),
                  borderRadius: normalize(10),
                  overflow: 'hidden',
                  justifyContent: 'center',
                }}>
                <View
                  ref={progressBarRef}
                  style={{
                    height: '100%',
                    width: '0%',
                    backgroundColor: Colors.yellow,
                  }}
                />
              </View>
            )}
          </View>
          {DBstatus == false && (
            <Button
              backgroundColor={Colors.yellow}
              title={'DONE'}
              marginTop={normalize(10)}
              textColor={Colors.black}
              titlesingle={true}
              fontFamily={Fonts.RobotoMedium}
              fontSize={normalize(16)}
              letterSpacing={2}
              fontWeight="500"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  parentview: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-evenly',
    paddingHorizontal: normalize(15),
  },
  txtdeviceconnect: {
    color: '#929292',
    alignSelf: 'center',
    //   fontWeight: '700',
    fontFamily: Fonts.RobotoLight,
    fontSize: normalize(10),
    letterSpacing: normalize(1),
    marginTop: normalize(4),
  },
  txtpowakaddy: {
    color: Colors.white,
    alignSelf: 'center',
    // fontWeight: '700',
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(12),
    letterSpacing: normalize(1),
  },
  progressContain: {
    height: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(-40),
  },
  logoview: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  parentview1: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
  },
  mainview: {
    backgroundColor: Colors.lightblack,
    height: '75%',
    borderTopRightRadius: normalize(30),
    borderTopLeftRadius: normalize(30),
    paddingHorizontal: normalize(15),
    paddingTop: normalize(20),
    justifyContent: 'space-between',
  },
  backview: {
    position: 'absolute',
    left: normalize(15),

    justifyContent: 'center',
    height: normalize(35),
    width: normalize(35),
  },
  backimg: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  bodyimgview: {
    width: Platform.OS == 'ios' ? normalize(100) : normalize(120),
    height: Platform.OS == 'ios' ? normalize(100) : normalize(120),
    borderRadius: normalize(100),
    backgroundColor: '#2D2B2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(25),
    marginTop: normalize(35),
  },
  bodyimg: {
    width: normalize(55),
    height: normalize(55),
    resizeMode: 'contain',
  },
  txtfirmwareupdate: {
    color: Colors.white,
    fontSize: normalize(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    textTransform: 'uppercase',
    letterSpacing: normalize(1),
  },
  txtbody: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    lineHeight: normalize(20),
    marginTop: normalize(10),
    width: normalize(200),
    // marginLeft: normalize(10),
  },
  animate: {
    width: normalize(250),
    height: normalize(250),
    borderWidth: 3,

    borderRadius: normalize(200),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
