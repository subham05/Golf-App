import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import _ from 'lodash';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import {useSelector} from 'react-redux';
import normalize from '../../utils/helpers/dimen';
import Button from '../../components/Button';
import Realm from 'realm';
import {BleContext} from '../../utils/helpers/BleBoundary';
import {useIsFocused} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import showErrorAlert from '../../utils/helpers/Toast';
let realm = new Realm({path: 'Powakaddy.realm'});

const DEVICE_INFO = [
  {
    name: 'PowaKaddy Trolley',
    serviceID: 'FB340100-8000-0080-0010-0000433500CF',
    characteristicID: 'FB340103-8000-0080-0010-0000433500CF',
  },
  {
    name: 'POWAKADDY [035]',
    serviceID: '9A87CD30-C747-11ED-A901-0800200C9A66',
    characteristicID: '9A87CD33-C747-11ED-A901-0800200C9A66',
  },
];

export default function Successfulpaired({navigation, route}) {
  const {device} = route?.params;
  const context = useContext(BleContext);
  const isFocused = useIsFocused();
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);

  const [paired, setPaired] = useState(1);
  const [progValue, setProgValue] = useState(0);
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));

  // 'PowaKaddy Trolley', 'PowaKaddy'

  const fadeInValue = new Animated.Value(0);
  Animated.sequence([
    Animated.delay(500),
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();

  // Step 1 - Check device
  useEffect(() => {
    if (isFocused && GolfCourseReducer.bleStatus) {
      connect(device);
    }
  }, [isFocused, device]);

  // Connect Device
  function connect(data) {
    if (data?.name == 'POWAKADDY [035]' || data?.name.trim() == 'POWAKADDY') {
      connectionIos(data?.id, data?.name);
    } else if (Platform.OS == 'android' && GolfCourseReducer.bleStatus) {
      connectionAndroid(data?.id, data?.name);
    } else if (GolfCourseReducer.bleStatus && Platform.OS == 'ios') {
      connectionIos(data?.id, data?.name);
    } else {
      showErrorAlert('Please turn on your device bluetooth');
    }
  }

  // Connection ..
  function connectionAndroid(id, deviceName) {
    context.connect(id, cr => {
      if (cr && GolfCourseReducer.bleStatus) {
        console.log('connect --- successflly -------------- 1');
        context.getAllBondedPeripherals(arr => {
          setProgValue(1);
          if (arr.length !== 0) {
            var result = arr.filter(i => i.id == id);

            if (!_.isEmpty(result)) {
              checkIosDevicePair(id, deviceName, res1 => {
                // console.log('-=-=-=-=-', res1);
                if (res1 !== false) {
                  setPaired(2); //
                  if (deviceObj?.length > 0) {
                    if (deviceObj?.find(item => item?.id !== id)) {
                      disconnectAllDevice(deviceObj);
                    }
                  }
                  readDeviceInfo(res1, deviceName, id);
                }
              });
            } else if (GolfCourseReducer.bleStatus) {
              context.createBond(id, res => {
                if (res) {
                  checkIosDevicePair(id, deviceName, res1 => {
                    console.log('-=-=-=-=-', res1);
                    if (res1 !== false) {
                      setProgValue(1);
                      setPaired(2); // Pair Successfully
                      if (deviceObj?.length > 0) {
                        if (deviceObj?.find(item => item?.id !== id)) {
                          disconnectAllDevice(deviceObj);
                        }
                      }
                      readDeviceInfo(res1, deviceName, id);
                    }
                  });
                } else {
                  setPaired(3);
                  console.log('Connection Failed'); // --> Failed
                }
              });
            }
          } else if (GolfCourseReducer.bleStatus) {
            console.log('connect --- createBond -------------- 2');
            context.createBond(id, res => {
              if (res) {
                checkIosDevicePair(id, deviceName, res1 => {
                  if (res1 !== false) {
                    console.log('readSerealNumber');
                    if (deviceObj?.length > 0) {
                      if (deviceObj?.find(item => item?.id !== id)) {
                        disconnectAllDevice(deviceObj);
                      }
                    }
                    readDeviceInfo(res1, deviceName, id);
                    setProgValue(1);
                    setPaired(2); // Pair Successfully
                  }
                });
              } else {
                setPaired(3);
                console.log('Connection Failed'); // --> Failed
              }
            });
          } else {
            setPaired(3);
            console.log('Connection Failed'); // --> Failed
          }
        });
      } else {
        setPaired(3);
        console.log('Connection Failed'); // --> Failed
      }
    });
  }

  function connectionIos(id, deviceName) {
    context.connect(id, cr => {
      if (cr && GolfCourseReducer.bleStatus) {
        if (
          deviceName == 'PowaKaddy Trolley' ||
          deviceName == 'POWAKADDY [035]' ||
          deviceName.trim() == 'POWAKADDY'
        ) {
          setProgValue(1);
          checkIosDevicePair(id, deviceName, res => {
            if (res !== false) {
              // setProgValue(1);
              setPaired(2); // Pair Successfully
              if (deviceObj?.length > 0) {
                if (deviceObj?.find(item => item?.id !== id)) {
                  disconnectAllDevice(deviceObj);
                }
              }
              readDeviceInfo(res, deviceName, id);
            } else {
              setPaired(3);
            }
          });
        } else if (deviceName == 'PowaKaddy' && GolfCourseReducer.bleStatus) {
          // Working
        } else if (GolfCourseReducer.bleStatus) {
          // Others Devices
        } else {
          setPaired(3);
          console.log('Connection Failed'); // --> Failed
        }
      } else {
        setPaired(3);
        console.log('Connection Failed'); // --> Failed
      }
    });
  }

  // Check Ios Pair --> 'PowaKaddy Trolley'
  function checkIosDevicePair(id, deviceName, callback = () => {}) {
    if (deviceName.trim() == 'POWAKADDY') {
      context.getEpsonDeviceFWVersion(id, res => {
        console.log('res write--- ', res);
      });
    }

    let delay = Platform.OS == 'android' ? 35000 : 30000;
    let _ID;

    const _timeOut = setTimeout(() => {
      clearInterval(_ID);
      callback(false);
    }, delay);

    _ID = setInterval(() => {
      if (deviceName.trim() == 'POWAKADDY') {
        context.getEpsonReadFWVersion(id, res => {
          if (res !== false) {
            clearInterval(_ID);
            clearTimeout(_timeOut);
            callback(res);
          } else {
            callback(false);
          }
        });
      } else {
        getTrollyDeviceSettings(id, deviceName, res => {
          if (res !== false) {
            clearInterval(_ID);
            clearTimeout(_timeOut);
            callback(res);
          } else {
            callback(false);
          }
        });
      }
    }, 2500);
  }

  // Get Device Settings --> 'PowaKaddy Trolley'
  function getTrollyDeviceSettings(id, deviceName, callback = () => {}) {
    // console.log('getTrollyDeviceSettings : ', deviceName);
    if (GolfCourseReducer.bleStatus) {
      if (
        deviceName == 'PowaKaddy Trolley' ||
        deviceName == 'POWAKADDY [035]'
      ) {
        let result = DEVICE_INFO.filter(item => item.name == deviceName);

        console.log('result : ========>>>>', result);

        context.readService(
          id,
          result[0]?.serviceID, //Service ID
          result[0]?.characteristicID, //Characteristic UUID
          res => {
            console.log('Device Settings =====> 2', res);
            if (!_.isEmpty(res)) {
              console.log('CALLBACK --> 1');
              callback(res);
            } else {
              console.log('CALLBACK --> 2');
              callback(false);
            }
          },
        );
      } else {
        callback(false);
      }
    } else {
      console.log('CALLBACK --> 3');
      callback(false);
    }
  }

  function readDeviceInfo(res, name, id) {
    console.log('----resssvalue', res);
    if (name == 'PowaKaddy Trolley' || name == 'POWAKADDY [035]') {
      context.getSerialNumber(
        res,
        name == 'PowaKaddy Trolley' ? 11 : 12,
        re1s => {
          if (re1s) {
            addLocalStore(name, id, res, re1s);
          }
        },
      );
    } else if ('POWAKADDY' == name.trim()) {
      addLocalStore(name, id, '18', 'N');
    }
  }

  function addLocalStore(name, id, res, serial_number) {
    let ifPresend = undefined;
    let obj = realm.objects('bluetooth_devices');

    if (obj.length > 0) {
      ifPresend = obj.find(i => i.id == id);
    }

    console.log('ifPresend -- ', ifPresend, name, id);

    if (ifPresend == undefined) {
      realm.write(() => {
        realm.create('bluetooth_devices', {
          bluetoothName: name,
          serial_number: serial_number,
          id: id,
          status: true,
          auto_advance: true,
          callNotifiy: true,
          textNotifiy: true,
          textBodyNotifiy: true,
          emailNotifiy: true,
          mtu: name.trim() == 'POWAKADDY' ? res : readMtu(res, name),
          bytes: '27',
          gender: 'Male',
          courseCount:
            name.trim() == 'POWAKADDY' ? '38230' : readCourseCount(res, name),
          deviceVersion:
            name.trim() == 'POWAKADDY' ? '1.1.3' : readFWVersion(res, name),
        });
      });
    }
  }

  function readFWVersion(data, name) {
    if (name == 'POWAKADDY [035]') {
      let versionWhist = data[4] + '.' + data[5] + '.' + data[6];

      return String(versionWhist);
    } else {
      let version =
        String.fromCharCode(data[0]) +
        '.' +
        String.fromCharCode(data[1]) +
        '.' +
        String.fromCharCode(data[2]);
      console.log('Version', version);

      return String(version);
    }
  }

  function readCourseCount(data, name) {
    let decimal2bin = convertToBinary(
      name == 'PowaKaddy Trolley' ? data[9] : data[2],
    );
    let decimal2bin1 = convertToBinary(
      name == 'PowaKaddy Trolley' ? data[10] : data[3],
    );

    if (decimal2bin !== '' && decimal2bin1 !== '') {
      let i =
        name == 'PowaKaddy Trolley'
          ? data[9].toString().length == 2
            ? '0' + decimal2bin
            : decimal2bin
          : data[2].toString().length == 2
          ? '0' + decimal2bin
          : decimal2bin;
      let bin2Decimal = convertToDecimal(decimal2bin1 + i);
      // console.log('COURSE COUNT', bin2Decimal);
      return String(bin2Decimal);
    }
  }

  function readMtu(data, name) {
    let mtu_1 = convertDecimalToBinary(
      name == 'PowaKaddy Trolley' ? data[7] : data[0],
    );
    let mtu_2 = convertDecimalToBinary(
      name == 'PowaKaddy Trolley' ? data[8] : data[1],
    );

    let bintodec_MTU = bin_to_dec(mtu_2 + mtu_1);
    return String(bintodec_MTU);
  }

  function convertDecimalToBinary(decimalNumber) {
    if (!isNaN(decimalNumber)) return (decimalNumber >>> 0).toString(2);
    return false;
  }

  function bin_to_dec(bstr) {
    return parseInt((bstr + '').replace(/[^01]/gi, ''), 2);
  }

  function convertToBinary(n) {
    // console.log('convertToBinary : ',n)
    if (n < 0) {
      n = 0xffff + n + 1;
    }

    return parseInt(n, 10).toString(2);
  }

  function convertToDecimal(num) {
    return parseInt((num + '').replace(/[^01]/gi, ''), 2);
  }

  const disconnectAllDevice = data => {
    if (data?.length !== 0) {
      for (let i = 0; i < data?.length; i++) {
        unpairDevice(deviceObj[i]?.id);
      }
      realm.write(() => {
        realm.delete(realm.objects('bluetooth_devices'));
      });
    }
  };

  const unpairDevice = _id => {
    if (Platform.OS == 'android') {
      context.getAllBondedPeripherals(res => {
        if (res?.length !== 0) {
          var result = res.filter(i => i.id == _id);
          if (result?.length !== 0) {
            context.removeBond(_id, res1 => {
              if (res1 !== false) {
                console.log('Unpair Success in Android');
              }
            });
          }
        }
      });
    } else {
      context.disconnect(_id, res => {
        if (res !== false) {
          console.log('Unpair Success in IOS');
        }
      });
    }
  };

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
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
      <View style={styles.parentview}>
        <Text style={styles.txtpairing}>{paired == 1 && 'PAIRING...'} </Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {paired == 1 && (
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
          {paired == 2 && (
            <Animated.View
              style={[
                styles.animate,
                {
                  borderColor: Colors.yellow,
                  transform: [{scale: fadeInValue}],
                  opacity: fadeInValue,
                },
              ]}></Animated.View>
          )}
          {paired == 3 && (
            <Animated.View
              style={[
                styles.animate,
                {
                  borderColor: Colors.red,
                  transform: [{scale: fadeInValue}],
                  opacity: fadeInValue,
                },
              ]}></Animated.View>
          )}

          <Image
            source={Icons.spinLogo}
            style={[
              styles.logoCenter,
              {tintColor: paired == 3 ? Colors.white : null},
            ]}
          />
        </View>
        {paired == 1 && (
          <View>
            <Text style={styles.txtpowakaddy}>Pairing Powakaddy</Text>
            <Text style={styles.txtdummy}>Do not power off your trolley</Text>
          </View>
        )}
        {paired == 2 && (
          <View>
            <Text style={styles.txtpowakaddy}>Successfully Paired</Text>
            <Text style={styles.txtdummy}>Your Device is Connected</Text>
          </View>
        )}
        {paired == 3 && (
          <View>
            <Text style={styles.txtpowakaddy}>Pairing Error</Text>
            <Text style={styles.txtdummy}>
              Your Trolley Did Not Pair Successfully
            </Text>
          </View>
        )}
        <View style={styles.progressContain}>
          {paired == 1 && (
            <Progress.Bar
              color={Colors.yellow}
              unfilledColor={Colors.darkGrey}
              borderWidth={0}
              progress={progValue}
              height={normalize(2)}
              width={normalize(280)}
              useNativeDriver={true}
              animationConfig={{duration: 15000}}
              animationType={'timing'}
            />
          )}
        </View>
        {paired == 1 && (
          <Button
            backgroundColor={Colors.yellow}
            title={'CANCEL'}
            marginTop={normalize(10)}
            textColor={Colors.black}
            titlesingle={true}
            fontFamily={Fonts.RobotoMedium}
            fontSize={normalize(16)}
            letterSpacing={2}
            fontWeight="500"
            onPress={() => {
              if (deviceObj?.length > 0) {
                navigation.navigate('MyDevice');
              } else {
                navigation.navigate('Connecttoyou');
              }
            }}
          />
        )}
        {paired == 2 && (
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
              // convertDeviceSettings();
              // navigation.navigate('Home', {device: device});
              navigation.reset({routes: [{name: 'Home'}]});
            }}
          />
        )}
        {paired == 3 && (
          <Button
            backgroundColor={Colors.yellow}
            title={'TRY AGAIN'}
            marginTop={normalize(10)}
            textColor={Colors.black}
            titlesingle={true}
            fontFamily={Fonts.RobotoMedium}
            fontSize={normalize(16)}
            letterSpacing={2}
            fontWeight="500"
            onPress={() => {
              setPaired(1);
              setProgValue(0);
              if (GolfCourseReducer.bleStatus) {
                connect(device);
              }
              // checkAlreadyExits(
              //   GolfCourseReducer.scannedDevices[0]?.id,
              //   GolfCourseReducer.scannedDevices[0]?.name,
              // );
            }}
          />
        )}
      </View>
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
  txtpowakaddy: {
    color: Colors.white,
    alignSelf: 'center',
    // fontWeight: '700',
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(12),
    letterSpacing: normalize(1),
  },
  txtdeviceconnected: {
    color: '#929292',
    alignSelf: 'center',
    //   fontWeight: '700',
    fontFamily: Fonts.RobotoLight,
    fontSize: normalize(10),
    letterSpacing: normalize(1),
    marginTop: normalize(4),
  },
  txtpairing: {
    color: Colors.white,
    alignSelf: 'center',
    // fontWeight: '700',
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(12),
    letterSpacing: normalize(1),
    marginTop: normalize(15),
  },
  txtdummy: {
    color: '#929292',
    alignSelf: 'center',
    //   fontWeight: '700',
    fontFamily: Fonts.RobotoLight,
    fontSize: normalize(10),
    letterSpacing: normalize(1),
    marginTop: normalize(8),
    textTransform: 'capitalize',
  },
  txtpowakaddy: {
    color: Colors.white,
    alignSelf: 'center',
    // fontWeight: '700',
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(14),
    letterSpacing: normalize(1),
  },
  progressContain: {
    height: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCenter: {
    position: 'absolute',
    width: normalize(160),
    height: normalize(160),
    resizeMode: 'contain',
    alignSelf: 'center',
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
