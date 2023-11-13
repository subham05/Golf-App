import React, {useContext, useEffect, useState, useRef} from 'react';
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
import {BleContext} from '../../utils/helpers/BleBoundary';
import {useIsFocused} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import showErrorAlert from '../../utils/helpers/Toast';
import Base64 from 'base-64';
import {stringToBytes} from 'convert-string';
var CRC32 = require('crc-32');
var ByteBuffer = require('bytebuffer');

// const ServiceUUID = '9A87CD30-C747-11ED-A901-0800200C9A66';
// const CharacteristicUUID = '9A87CD31-C747-11ED-A901-0800200C9A66';
const ServiceUUID = '9A87CD30-C747-11ED-A901-0800200C9A66';
const CharacteristicUUID = '9A87CD31-C747-11ED-A901-0800200C9A66';
var delayValue = Platform.OS == 'ios' ? 230 : 430; // 30
var currentDelay = Platform.OS == 'ios' ? 130 : 330;

// var delayValue = Platform.OS == 'ios' ? 330 : 430 ;
// var currentDelay = Platform.OS == 'ios' ? 230 : 330;

export default function CourseUpdateProcess(props) {
  const {
    courseName,
    courseDis,
    deviceCourseCount,
    serverDetails,
    deviceMTU,
    deviceID,
    deviceName,
  } = props.route.params;
  const progressBarRef = useRef(null);
  const context = useContext(BleContext);
  const isFocused = useIsFocused();
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);

  const [paired, setPaired] = useState(1);
  const [progValue, setProgValue] = useState(0);

  useEffect(() => {
    if (isFocused) {
      uploadCourseDate(deviceCourseCount, serverDetails, deviceMTU);
      setProgValue(1);
    }
  }, [isFocused]);

  function getTotalPacketCount(_courseDataSize, _coursePayloadSize) {
    let _division = Math.floor(_courseDataSize / _coursePayloadSize);
    let _remainder = (_courseDataSize + 1) % _coursePayloadSize;

    if (_remainder == 0) {
      return 0 + _division;
    } else {
      return 1 + _division;
    }
  }

  // *  We have just created an Course Data array to initiate our process
  const uploadCourseDate = (deviceCourseCount, serverDetails, mtu) => {
    let decodeByteArr = Base64.decode(serverDetails?.glfCourse?.glf);
    let courseData = stringToBytes(decodeByteArr);

    // console.log('Course Arr', courseData);

    // Variables
    let totalCourses = serverDetails?.totalCourses;

    let course_Id = serverDetails?.id_course;
    let course_Index = serverDetails?.glfCourse.index;
    let custom_course_flag = serverDetails?.bCustom;
    console.log('----logging', courseData);
    console.log('----logging1', course_Id);
    console.log('----logging2', course_Index);
    console.log('----logging3', custom_course_flag);
    let headerArr = getCourseHeader(
      courseData,
      course_Id,
      course_Index,
      custom_course_flag,
    );
    console.log('headerArr : ', headerArr, 'Header Length', headerArr.length);

    if (totalCourses == deviceCourseCount) {
      context.writeWithoutResponse(
        deviceID,
        ServiceUUID,
        CharacteristicUUID,
        headerArr,
        headerArr.length,
        val => {
          if (val != false) {
            writeCourseDataPackets(courseData, mtu);
          } else {
            // console.log('Failed');
            setPaired(3);
          }
        },
      );
    }
  };

  function getCourseHeader(courseData, id_course, idx, bCustom) {
    let crc = CRC32.buf(courseData);
    let _bCustom = bCustom == 1 ? 1 : 0;
    const b = new ByteBuffer(36, ByteBuffer.LITTLE_ENDIAN);

    b.writeInt(0x0000);
    b.writeInt(courseData.length);
    b.writeInt(0);
    b.writeInt(crc);
    b.writeByte(0x01);
    b.writeShort(id_course);
    b.writeShort(idx);
    b.writeByte(_bCustom);

    var byteArray = new Uint8Array(b.buffer);

    var array = Array.from(byteArray);

    return array;
  }

  function writeCourseDataPackets(courseData, mtu) {
    let packetNumber = 1;

    let coursePayloadSize = mtu - 4 - 3;
    let totalPacketsCount = getTotalPacketCount(
      courseData.length,
      coursePayloadSize,
    );

    const bb = new ByteBuffer(mtu - 3, ByteBuffer.LITTLE_ENDIAN);

    setTimeout(() => {
      writeCoursePacketsOneByOne(
        courseData,
        bb,
        0,
        packetNumber,
        totalPacketsCount,
        mtu,
      );
    }, delayValue);
  }

  function writeCoursePacketsOneByOne(
    courseData,
    bb,
    cursorPositionIn,
    packetNumberIn,
    totalPacketCount,
    mtu,
  ) {
    var cursorPosition = cursorPositionIn;
    var packetNumber = packetNumberIn;

    if (cursorPosition < courseData.length) {
      bb.clear();
      bb.writeInt(packetNumber);

      var j = 4;
      while (j < mtu - 3 && cursorPosition < courseData.length) {
        bb.writeByte(courseData[cursorPosition]);
        ++j;
        ++cursorPosition;
      }

      var _array = new Uint8Array(bb.clone().buffer);
      var clone_array = Array.from(_array);

      console.log('clone_array : ', clone_array);
      const animationWidth = parseInt(
        packetNumber > 0 && totalPacketCount > 0
          ? (packetNumber / totalPacketCount) * 100
          : 0,
      );
      let widthStr = animationWidth.toString();
      updateProgress(widthStr);
      context.writeWithoutResponse(
        deviceID,
        ServiceUUID,
        CharacteristicUUID,
        clone_array,
        clone_array.length,
        val => {
          if (val != false) {
            ++packetNumber;
            if (packetNumber < totalPacketCount) {
              setTimeout(() => {
                writeCoursePacketsOneByOne(
                  courseData,
                  bb,
                  cursorPosition,
                  packetNumber,
                  totalPacketCount,
                  mtu,
                );
              }, currentDelay);
            } else {
              setTimeout(() => {
                writeCourseLastPacket(
                  courseData,
                  cursorPosition,
                  packetNumber,
                  totalPacketCount,
                  mtu,
                );
              }, currentDelay);
            }
          } else {
            console.log('Failed');
            setPaired(3);
          }
        },
      );
    } else {
      console.log('Failed');
      setPaired(3);
    }
  }

  function writeCourseLastPacket(
    courseData,
    cursorPositionIn,
    packetNumberIn,
    totalPacketCount,
    mtu,
  ) {
    const bb = new ByteBuffer(
      courseData.length - cursorPositionIn + 4,
      ByteBuffer.LITTLE_ENDIAN,
    );

    var cursorPosition = cursorPositionIn;
    var packetNumber = packetNumberIn;

    if (cursorPosition < courseData.length) {
      bb.clear();
      bb.writeInt(packetNumber);

      var j = 4;
      while (j < mtu - 3 && cursorPosition < courseData.length) {
        bb.writeByte(courseData[cursorPosition]);
        ++j;
        ++cursorPosition;
      }

      var _array = new Uint8Array(bb.clone().buffer);

      var clone_array = Array.from(_array);
      console.log('clone_array : ', clone_array);

      context.writeWithoutResponse(
        deviceID, //peripheral_id
        ServiceUUID, // serviceUUID
        CharacteristicUUID, //characteristicUUID
        clone_array,
        clone_array.length,
        val => {
          if (val != false) {
            ++packetNumber;
            if (packetNumber < totalPacketCount) {
              setTimeout(() => {
                writeCoursePacketsOneByOne(
                  courseData,
                  bb,
                  cursorPosition,
                  packetNumber,
                  totalPacketCount,
                  mtu,
                );
              }, currentDelay);
            } else {
              setTimeout(() => {
                writeCourseLastPacket(
                  courseData,
                  cursorPosition,
                  packetNumber,
                  totalPacketCount,
                  mtu,
                );
              }, currentDelay);
            }
          } else {
            console.log('Failed');
            setPaired(3);
          }
        },
      );
    } else {
      if (cursorPosition == courseData.length) {
        console.log('Success');
        setPaired(2);
        setProgValue(1);
      } else {
        console.log('Failed');
        setPaired(3);
      }
    }
  }
  const updateProgress = wid => {
    console.log('----width===============', wid);
    if (progressBarRef.current) {
      progressBarRef.current.setNativeProps({
        style: {width: `${wid}%`, backgroundColor: Colors.yellow},
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
      <View style={styles.parentview}>
        <Text style={styles.txtpairing}>{paired == 1 && 'Updating...'} </Text>

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
            <Text style={styles.txtpowakaddy}>Updating Course</Text>
            <Text style={styles.txtdummy1}>
              Do Not Power Off Trolley Until Update Is Complete
            </Text>
            <Text style={styles.txtdummy}>
              {courseName}, {courseDis} miles
            </Text>
          </View>
        )}
        {paired == 2 && (
          <View>
            <Text style={styles.txtpowakaddy}>Successfully Updated</Text>
            <Text style={styles.txtdummy}>
              {courseName}, {courseDis} miles
            </Text>
          </View>
        )}
        {paired == 3 && (
          <View>
            <Text style={styles.txtpowakaddy}>Update Unsuccessful</Text>
            <Text style={styles.txtdummy1}>
              Please Check Device Is Paired With Your PowaKaddy GPS Trolley
            </Text>
            <Text style={styles.txtdummy}>
              {courseName}, {courseDis} miles
            </Text>
          </View>
        )}
        <View style={styles.progressContain}>
          {paired == 1 && (
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
            onPress={() => props.navigation.navigate('CourseSearch')}
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
              props.navigation.navigate('CourseSearch');
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
  txtdummy1: {
    color: '#ccc',
    alignSelf: 'center',
    //   fontWeight: '700',
    fontFamily: Fonts.RobotoLight,
    fontSize: normalize(11),
    letterSpacing: normalize(1),
    marginTop: normalize(8),
    // textTransform: 'capitalize',
    textAlign: 'center',
  },
  txtpowakaddy: {
    color: Colors.white,
    alignSelf: 'center',
    // fontWeight: '700',
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(14),
    letterSpacing: normalize(1),
    // textAlign: 'center',
  },
  progressContain: {
    height: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(50),
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
