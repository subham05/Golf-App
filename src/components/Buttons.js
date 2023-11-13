import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../themes/ImagePath';

export default function Buttons({onPress, text}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.BtnTxt}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
  },
  BtnTxt: {
    color: Colors.black,
    fontSize: 16,
    letterSpacing: 2,
    fontFamily: Fonts.RobotoMedium,
  },
});
