import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Fonts} from '../themes/ImagePath';
import {Colors, Icons} from '../themes/ImagePath';
import {horizontalScale, verticalScale} from '../utils/helpers/size';
// create a component
const SearchDefaultCard = ({data, onPress, color}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View
        style={{
          height: '100%',
          width: '75%',
          marginLeft: '5%',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            styles.head,
            {fontFamily: Fonts.RobotoBold, color: color ? color : Colors.white},
          ]}>
          {data?.courseName}
        </Text>
        <View
          style={{
            height: '40%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 18, width: 13, resizeMode: 'contain'}}
            source={Icons.Flag}
          />
          <Text
            style={{
              marginLeft: 5,
              color: '#B3B3B3',
              fontFamily: Fonts.RobotoRegular,
              fontSize: 13,
            }}>
            {data.city}
            {data.des}
            {', '}
            {data?.distance}
            {' miles'}
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
  card: {
    height: horizontalScale(90),
    backgroundColor: Colors.background,
    borderRadius: 13,
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  head: {
    // color: Colors.white,
    fontSize: 15,
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
export default React.memo(SearchDefaultCard);
