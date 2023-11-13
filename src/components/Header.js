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
const Header = ({line = true}) => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <View style={styles.innerBtn}>
            <Image source={Icons.LeftArrow} style={styles.back} />
          </View>
        </TouchableOpacity>
        <Image source={Icons.logo} style={styles.logo} />
        <View
          style={{
            height: horizontalScale(50),
            width: horizontalScale(50),
          }}></View>
      </View>
      {line && (
        <View
          style={{
            width: '90%',
            height: 1,
            backgroundColor: Colors.line,
            alignSelf: 'center',
            marginTop: horizontalScale(10),
            marginBottom: verticalScale(3),
          }}></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',

    marginTop: Platform.OS == 'ios' ? 0 : normalize(10),
    height: normalize(60),
  },
  back: {
    height: horizontalScale(10),
    width: verticalScale(10),
    resizeMode: 'contain',
  },
  logo: {
    height: horizontalScale(31.4),
    width: verticalScale(150),
    resizeMode: 'contain',
  },
  backBtn: {
    height: horizontalScale(50),
    width: horizontalScale(50),

    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? normalize(-10) : 0,
  },
  innerBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default Header;
