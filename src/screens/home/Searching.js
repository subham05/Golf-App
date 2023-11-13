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
import {BleContext} from '../../utils/helpers/BleBoundary';
import {useIsFocused} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import showErrorAlert from '../../utils/helpers/Toast';
import Realm from 'realm';

let realm = new Realm({path: 'Powakaddy.realm'});

export default function Searching(props) {
  const context = useContext(BleContext);
  const isFocused = useIsFocused();
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);

  const [paired, setPaired] = useState(1);
  const [progValue, setProgValue] = useState(0);
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));
  // console.log('Device OBJECT::', deviceObj);

  // Start Scan
  useEffect(() => {
    // console.log('isFocused ----------------------------------- ', isFocused);
    if (isFocused) {
      scan();
    }
  }, [isFocused]);

  useEffect(() => {
    if (GolfCourseReducer?.bleStatus !== true) {
      setPaired(3);
    }
  }, [GolfCourseReducer?.bleStatus]);

  // Scaning ..
  function scan() {
    // console.log('start scan --- ');
    setTimeout(() => setProgValue(1), 2000);

    context.startScan(item => {
      console.log('Scan Item', item);

      let peripheralNames = [
        ...new Map(item.map(item => [item['name'], item])).values(),
      ];

      // console.log('peripheralNames', peripheralNames);

      let _name = 'POWAKADDY'; // 'PowaKaddy Trolley', 'PowaKaddy' //toUpperCase

      let result = peripheralNames.filter(
        item => item.name.slice(0, 9).toUpperCase() == '' + _name,
      );

      // console.log('Result', result);
      if (result.length !== 0) {
        setProgValue(1);
        // setPaired(2);
        if (deviceObj.length > 0) {
          // console.log('__________________ 1');
          if (result?.find(item => item.id == deviceObj[0].id)) {
            let pkArrIndex = result?.findIndex(
              item => item.id == deviceObj[0].id,
            );
            console.log('POWAKADDY Existing Device', pkArrIndex);
            result?.splice(pkArrIndex, 1);
            // console.log('NEW RESULT');
            sendDeviceObj(result);
          } else {
            sendDeviceObj(result);
          }
        } else {
          // console.log('__________________ 2');
          console.log('result : ', result);
          sendDeviceObj(result);
        }
      } else {
        setPaired(3);
      }
    });
  }

  const sendDeviceObj = data => {
    if (data?.length == 1 && data[0].name == 'POWAKADDY [035]') {
      setTimeout(() => {
        props.navigation.navigate('Successfulpaired', {
          device: data[0],
        });
      }, 1500);
    } else {
      setTimeout(() => {
        props.navigation.navigate('Selectgpsversion', {devices: data});
      }, 1500);
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
        <Text style={styles.txtpairing}>{paired == 1 && 'Scanning...'} </Text>

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
            <Text style={styles.txtpowakaddy}>Scanning Powakaddy</Text>
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
            <Text style={styles.txtpowakaddy}>Error</Text>
            <Text style={styles.txtdummy}>No device found</Text>
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
                props.navigation.goBack();
              } else {
                props.navigation.navigate('Connecttoyou');
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
            onPress={() => props.navigation.navigate('Home')}
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
              if (GolfCourseReducer?.bleStatus) {
                setPaired(1);
                setTimeout(() => {
                  scan();
                }, 1000);
                setProgValue(0);
              } else {
                showErrorAlert('Please turn on your bluetooth');
              }
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
