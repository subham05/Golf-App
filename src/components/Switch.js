import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import normalize from '../utils/helpers/dimen';
import {Colors, Fonts} from '../themes/ImagePath';
import {useNavigation} from '@react-navigation/native';

export default function Switch({
  value,
  onPress,
  style,
  textTrue = 'YES',
  textFalse = 'NO',
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: normalize(40),
          height: normalize(18),
          backgroundColor: value ? Colors.yellow : Colors.darkGrey,
          borderRadius: normalize(13),
          paddingHorizontal: normalize(6),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        style,
      ]}>
      {value ? (
        <Text
          style={{
            position: 'absolute',
            fontSize: normalize(9),
            left: normalize(3),
            fontFamily: Fonts.RobotoMedium,
            color: Colors.black,
          }}>
          {textTrue}
        </Text>
      ) : (
        <Text
          style={{
            position: 'absolute',
            fontSize: normalize(9),
            fontFamily: Fonts.RobotoMedium,
            right: normalize(3),
            color: Colors.black,
          }}>
          {textFalse}
        </Text>
      )}
      <View
        style={{
          height: normalize(16),
          width: normalize(16),
          backgroundColor: Colors.white,
          borderRadius: normalize(10),
          marginLeft: value == true ? normalize(15) : normalize(-4),
        }}
      />
      {/* <View
              style={{
                height: normalize(16),
                width: normalize(16),
                backgroundColor: remember == true ? Colors.pink : '#39458C',
                borderRadius: normalize(8),
              }}
            /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
