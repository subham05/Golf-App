import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../themes/ImagePath';
export default function SafeView(props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: props.color ? props.color : Colors.bgColor,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {props.children}
    </SafeAreaView>
  );
}
SafeView.propTypes = {
  backgroundColor: PropTypes.any,
};

SafeView.defaultProps = {
  backgroundColor: 'black',
};
