//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Fonts} from '../themes/ImagePath';
import {Colors, Icons} from '../themes/ImagePath';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/helpers/size';
// create a component
import {useNavigation} from '@react-navigation/native';
import normalize from '../utils/helpers/dimen';

const SearchCard = ({data, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card2} onPress={onPress}>
      <View
        style={{
          height: '100%',
          width: '75%',
          marginLeft: '5%',
          justifyContent: 'center',
          // backgroundColor:'red'
        }}>
        <Text style={[styles.head, {fontFamily: Fonts.RobotoBold}]}>
          {data?.courseName}
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: verticalScale(5),
          }}>
          <Text
            style={{
              color: '#B3B3B3',
              fontFamily: Fonts.RobotoRegular,
              fontSize: 13,
            }}>
            {data.city},{data.countryFull}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {data.status == true ? (
          <Image source={Icons.Write} style={styles.write} />
        ) : (
          <View style={styles.rightArrow}>
            <Image source={Icons.RightArrow} style={styles.right} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card2: {
    height: normalize(80),
    backgroundColor: Colors.background,

    borderRadius: moderateScale(13),
    marginBottom: verticalScale(10),
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    zIndex: 0,
  },
  head: {
    color: Colors.white,
    fontSize: 15,
    lineHeight: moderateScale(20),
    // fontWeight: 'bold',
  },
  rightArrow: {
    height: horizontalScale(25),
    width: horizontalScale(25),
    borderRadius: horizontalScale(25) + horizontalScale(25) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  write: {
    height: horizontalScale(25),
    width: verticalScale(25),
    resizeMode: 'contain',
  },
  right: {
    height: horizontalScale(12),
    width: verticalScale(12),
    resizeMode: 'contain',
  },
});

//make this component available to the app
export default React.memo(SearchCard);
