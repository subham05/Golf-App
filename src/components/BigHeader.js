//import liraries
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Colors, Icons} from '../themes/ImagePath';
import SafeView from '../components/SafeView';
import {horizontalScale, verticalScale} from '../utils/helpers/size';
// create a component
import {useNavigation} from '@react-navigation/native';
const BigHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        height: '15%',

        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backview}>
        <View style={styles.innerBtn}>
          <Image source={Icons.LeftArrow} style={styles.back} />
        </View>
      </TouchableOpacity>
      <Image source={Icons.logo} style={styles.logoview} />
    </View>
  );
};
const styles = StyleSheet.create({
  backview: {
    position: 'absolute',
    left: normalize(0),
    height: normalize(50),
    width: normalize(50),
    justifyContent: 'center',
    marginLeft: normalize(-15),
  },

  backimg: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  logoview: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  back: {
    height: horizontalScale(10),
    width: verticalScale(10),
    resizeMode: 'contain',
  },
  innerBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default BigHeader;
