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
const SearchGreenCard = ({data, onPress}) => {
  return (
    <View style={styles.card}>
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
              color: data?.status == false ? Colors.primary : Colors.white,
              fontFamily: Fonts.RobotoBold,
            },
          ]}>
          {data?.courseName}
        </Text>
        {data?.status == false ? (
          <View
            style={{
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
                color: Colors.white,
                fontFamily: Fonts.RobotoRegular,
              }}>
              {data?.des}
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: verticalScale(10),
              }}>
              <Image
                style={{height: 18, width: 13, resizeMode: 'contain'}}
                source={Icons.Flag}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: normalize(11),
                  color: Colors.lightGrey,
                  fontFamily: Fonts.RobotoRegular,
                }}>
                {data?.address1}
              </Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={Icons.Plus} style={styles.write} />
      </TouchableOpacity>
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
    color: Colors.primary,
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
export default React.memo(SearchGreenCard);
