import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Fonts} from '../themes/ImagePath';
import {Colors, Icons} from '../themes/ImagePath';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/helpers/size';
import normalize from '../utils/helpers/dimen';

// create a component
const AdvanceGreenListCard = ({data, deletePress}) => {
  return (
    <View
      style={styles.card}
      // onPress={onPress}
    >
      <View
        style={{
          width: '75%',
          marginLeft: '5%',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={[
            styles.head,
            ,
            {
              color: data?.isisDeleted == false ? Colors.primary : Colors.white,
              fontFamily: Fonts.RobotoBold,
            },
          ]}>
          {data?.course_name}
        </Text>
        <>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: normalize(5),
            }}>
            <Image
              style={{height: 18, width: 13, resizeMode: 'contain'}}
              source={Icons.Flag}
            />
            <Text
              style={{
                marginTop: normalize(4),
                fontSize: normalize(11),
                marginLeft: 5,
                color: Colors.lightGrey,
                fontFamily: Fonts.RobotoRegular,
              }}>
              {data?.location}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}></View>
        </>
      </View>

      <View
        style={{
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {data?.isisDeleted == false ? (
          <Image source={Icons.Plus} style={styles.write} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              deletePress();
            }}
            style={{
              height: horizontalScale(25),
              width: horizontalScale(25),
              // borderRadius: horizontalScale(25) + horizontalScale(25) / 4,
              // borderWidth: 1,
              // borderColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Icons.delete1}
              style={{
                height: horizontalScale(20),
                width: verticalScale(20),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    paddingVertical: moderateScale(14),
    backgroundColor: Colors.background,
    borderRadius: 13,
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: normalize(80),
  },
  head: {
    color: Colors.yellow,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  write: {
    height: horizontalScale(25),
    width: verticalScale(25),
    resizeMode: 'contain',
  },
});

//make this component available to the app
export default AdvanceGreenListCard;
