import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../themes/ImagePath';

import normalize from './dimen';
export default function Loader(props) {
  return props.visible ? (
    <SafeAreaView
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99999999999,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: Colors.greyDark,
          height: normalize(30),
          width: normalize(30),
          borderRadius: normalize(40),
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 8,
        }}>
        <ActivityIndicator size="small" color={Colors.yellow} />
      </View>
    </SafeAreaView>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};
