import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Animated, Easing} from 'react-native';
import _ from 'lodash';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import {useSelector} from 'react-redux';
import normalize from '../../utils/helpers/dimen';
import Button from '../../components/Button';
import {BleContext} from '../../utils/helpers/BleBoundary';
import {useIsFocused} from '@react-navigation/native';
import * as Progress from 'react-native-progress';

const NewdeviceConnect = ({navigation, route}) => {
  const {device} = route?.params;
  const context = useContext(BleContext);
  const isFocused = useIsFocused();
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);

  const [paired, setPaired] = useState(1);
  const [progValue, setProgValue] = useState(0);
  const [isRequest, setIsRequest] = useState(false);

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

  useEffect(() => {
    // console.log(
    //   'HomeReducer?.autoConnectDevice -------- ',
    //   HomeReducer?.autoConnectDevice,
    // );

    if (
      HomeReducer?.autoConnectDevice?.id !== null &&
      HomeReducer?.autoConnectDevice?.status &&
      isFocused
    ) {
      setPaired(2);
      setProgValue(1);
    } else if (
      HomeReducer?.autoConnectDevice?.id == device?.id &&
      HomeReducer?.autoConnectDevice?.status == false &&
      isFocused &&
      isRequest
    ) {
      setPaired(3);
      setProgValue(0);
    } else if (
      HomeReducer?.autoConnectDevice?.id == null &&
      HomeReducer?.autoConnectDevice?.status == false &&
      isFocused &&
      isRequest == false
    ) {
      setPaired(1);
      setProgValue(0);
      setIsRequest(true);
      context.autoConnectDevices(true);
    }
  }, [isFocused, HomeReducer?.autoConnectDevice]);

  return (
    <>
      <MyStatusBar backgroundColor={Colors.black} />
      <View style={styles.parentview}>
        <Text style={styles.txtpairing}>{paired == 1 && 'PAIRING.....'} </Text>
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
            onPress={() => navigation.goBack()}
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
              if (
                GolfCourseReducer.bleStatus &&
                HomeReducer?.autoConnectDevice == null
              ) {
                context.autoConnectDevices(true);
              }
            }}
          />
        )}
      </View>
    </>
  );
};

export default NewdeviceConnect;

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
