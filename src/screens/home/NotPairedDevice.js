import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import Button from '../../components/Button';
import MyStatusBar from '../../utils/MyStatusBar';
import {Easing} from 'react-native';
import {Image} from 'react-native';

const NotPairedDevice = (props) => {
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
  return (
    <>
      <MyStatusBar backgroundColor={Colors.black} />
      <View style={styles.parentview}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop:normalize(60)}}>
          <Animated.View
            style={[
              styles.animate,
              {
                borderColor: Colors.red,
                transform: [{scale: fadeInValue}],
                opacity: fadeInValue,
              },
            ]}></Animated.View>
          <Image
            source={Icons.spinLogo}
            style={[styles.logoCenter, {tintColor: Colors.white}]}
          />

          </View>
          <View>
            <Text style={styles.txtpowakaddy}>Error - No device paired</Text>
            <Text style={styles.txtdummy1}>
              Please Check Device Is Paired With Your PowaKaddy GPS Trolley
            </Text>
          </View>
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
                props.navigation.navigate('Searching');
            }}
          />
        </View>
    </>
  );
};

export default NotPairedDevice;

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
    fontSize: normalize(14),
    letterSpacing: normalize(1),
    // textAlign: 'center',
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
  animate: {
    width: normalize(250),
    height: normalize(250),
    borderWidth: 3,

    borderRadius: normalize(200),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoCenter: {
    position: 'absolute',
    width: normalize(160),
    height: normalize(160),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
