import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';

import normalise from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import {Colors, Fonts, Icons} from '../themes/ImagePath';
// import Icons from '../themes/icons';

export default function Button(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={props.disabled}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        justifyContent: props.justifyContent,
        alignItems: 'center',
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        opacity: props.opacity,
        flexDirection: 'row',
        position: props.btnposition,
        bottom: props.btnBottom,
        end: props.btnend,
        paddingHorizontal: props.paddingHorizontal,
      }}
      onPress={() => {
        onPress();
      }}>
      {props.sideImage ? (
        <Image
          source={props.sideImage}
          style={{
            height: props.imgheight,
            width: props.imgwidth,
            marginLeft: props.imagmarginLeft,
          }}
          resizeMode="contain"
        />
      ) : null}
      {props.issideImagelogin ? (
        <View
          style={{
            alignSelf: 'center',
            // backgroundColor: Colors.white,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: props.fontFamily,
              color: props.textColor,
              fontSize: props.fontSize,
              marginTop: 0,
              alignSelf: 'center',
              fontWeight: props.fontWeight,
              //   textTransform: 'uppercase',
              marginLeft: props.marginLeft,
              letterSpacing: props.letterSpacing,
            }}>
            {props.title}
          </Text>
        </View>
      ) : null}
      {props.titlesingle ? (
        <Text
          numberOfLines={props.numberOfLines}
          style={{
            fontFamily: props.fontFamily,
            color: props.textColor,
            fontSize: props.fontSize,
            marginTop: 0,
            alignSelf: props.textAlign,
            textAlign: 'center',
            fontWeight: props.fontWeight,
            letterSpacing: props.letterSpacing,
            //   textTransform: 'uppercase',
            // marginLeft: props.marginLeft,
          }}>
          {props.title}
        </Text>
      ) : null}
      {props.isightsideImage ? (
        <Image
          source={props.rightimg}
          style={{
            height: normalise(15),
            width: normalise(15),
            resizeMode: 'stretch',
            position: 'absolute',
            right: normalise(10),
            // tintColor: 'red',
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  numberOfLines: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.any,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.any,
  fontFamily: PropTypes.any,
  opacity: PropTypes.number,
  issideImage: PropTypes.bool,
  issideImagelogin: PropTypes.bool,
  textAlign: PropTypes.string,
  imgheight: PropTypes.any,
  imgwidth: PropTypes.any,
  isightsideImage: PropTypes.any,
  marginLeft: PropTypes.any,
  fontWeight: PropTypes.any,
  justifyContent: PropTypes.any,
  btnposition: PropTypes.any,
  btnBottom: PropTypes.any,
  sideImage: PropTypes.any,
  imagmarginLeft: PropTypes.any,
  btnend: PropTypes.any,
  paddingHorizontal: PropTypes.any,
  titlesingle: PropTypes.any,
  rightimg: PropTypes.string,
  letterSpacing: PropTypes.number,
};

Button.defaultProps = {
  letterSpacing: 0,
  numberOfLines: 0,
  height: normalise(40),
  backgroundColor: Colors.pink,
  borderRadius: normalise(5),
  textColor: Colors.white,
  fontSize: normalise(14),
  title: '',
  onPress: null,
  alignSelf: null,
  marginTop: 0,
  marginBottom: 0,
  marginHorizontal: 0,
  width: '100%',
  borderColor: '',
  borderWidth: 0,
  fontFamily: Fonts.Roboto_Black,
  opacity: 1,
  issideImage: false,
  issideImagelogin: false,
  textAlign: 'center',
  imgheight: normalise(19),
  imgwidth: normalise(19),
  isightsideImage: null,
  marginLeft: normalise(0),
  fontWeight: '400',
  justifyContent: 'space-around',
  btnposition: 'relative',
  btnBottom: null,
  sideImage: false,
  imagmarginLeft: normalise(17),
  btnend: null,
  paddingHorizontal: normalise(0),
  titlesingle: false,
};
