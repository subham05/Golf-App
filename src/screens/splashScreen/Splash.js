import React, {Fragment, useEffect} from 'react';
import {View, Animated, Easing, Image} from 'react-native';

import MyStatusBar from '../../utils/MyStatusBar';
import {Icons, Colors} from '../../themes/ImagePath';
import Realm from 'realm';
import {useSelector} from 'react-redux';

let realm = new Realm({path: 'Powakaddy.realm'});

export default function Splash(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  // // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // console.log('++++++++++++++++++++');
    if (AuthReducer?.isLoading == false) {
      setTimeout(() => {
        const device_all = realm?.objects('bluetooth_devices');
        const deviceObj = JSON.parse(JSON.stringify(device_all));
        // console.log('deviceObj',deviceObj);
        // console.log('REALM++++++++++', device_all, deviceObj);
        if (deviceObj?.length == 0 && AuthReducer?.getTokenResponse == null) {
          // console.log('hello1');
          // setTimeout(() => {
          props.navigation.replace('Signin');
          // }, 1000);
        } else if (
          AuthReducer?.getTokenResponse !== null &&
          deviceObj?.length == 0
        ) {
          // console.log('hello2');
          // setTimeout(() => {
          props.navigation.replace('Connecttoyou');
          // }, 1000);
        } else if (
          AuthReducer?.getTokenResponse !== null &&
          deviceObj?.length !== 0
        ) {
          // console.log('hello3');
          // setTimeout(() => {
          props.navigation.replace('Home');
          // }, 1000);
        }
      }, 1000);
    }
  }, [AuthReducer?.isLoading]);

  return (
    <Fragment>
      <View
        style={{
          backgroundColor: Colors.bgColor,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Animated.Image
          style={{
            width: normalize(280),
            height: normalize(280),
            resizeMode: 'contain',
            alignSelf: 'center',
            transform: [{rotate: spin}],
          }}
          source={Icons.spin}
        />

        <Image
          source={Icons.spinLogo}
          style={{
            position: 'absolute',
            width: normalize(160),
            height: normalize(160),
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>
    </Fragment>
  );
}
