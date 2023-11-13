import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/dimen';
import Modal from 'react-native-modal';
import {Colors, Fonts} from '../themes/ImagePath';

export default function Picker(props) {
  function onPress(item) {
    props.onPress(item);
    props.onBackdropPress();
  }

  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }

  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      // hideModalContentWhileAnimating={true}
      isVisible={props.isVisible}
      style={{width: '100%', alignSelf: 'center', margin: 0}}
      // animationInTiming={0}
      // animationOutTiming={0}
      onBackdropPress={() => onBackdropPress()}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: Colors.greyDark,
          borderTopRightRadius: normalize(15),
          borderTopLeftRadius: normalize(15),
          //   paddingBottom: normalize(15),
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: '100%',
            height:
              props?.data.length < 4
                ? normalize(80) * props?.data.length
                : normalize(180),
          }}>
          {props?.data ? (
            <FlatList
              data={props.data}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    activeOpacity={0.6}
                    style={{
                      height: normalize(40),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: Colors.lightGrey,
                      borderWidth: 0.5,
                      borderRadius: normalize(5),
                      width: '90%',
                      alignSelf: 'center',
                      marginVertical: normalize(10),
                    }}>
                    <Text
                      style={{
                        color: Colors.yellow,
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoBold,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

Picker.propTypes = {
  isVisible: PropTypes.bool,
  format: PropTypes.string,
  onBackdropPress: PropTypes.func,
  onPress: PropTypes.func,
};

Picker.defaultProps = {
  isVisible: true,
  width: '85%',
  onBackdropPress: null,
  onPress: null,
};
