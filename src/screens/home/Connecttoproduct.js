import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/dimen';
import Button from '../../components/Button';
import * as Progress from 'react-native-progress';
import showErrorAlert from '../../utils/helpers/Toast';


export default function Connecttoproduct(props) {
  const [paired, setPaired] = useState(1);
  const [progValue, setProgValue] = useState(0);

  useEffect(() => {
    scan();
    setTimeout(() => {
      setPaired(2)
    }, 2000);
  }, []);

  function scan() {
    // console.log('start scan --- ');
    setTimeout(() => setProgValue(1), 1000);
  }
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
        <Text style={styles.txtpairing}>{paired == 1 ? 'PAIRING.....' : null}</Text>
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
            onPress={() => props.navigation.goBack()}
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
            onPress={() => props.navigation.goBack()}
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
    alignSelf: 'center'
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
