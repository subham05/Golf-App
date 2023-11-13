import {StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import React from 'react';
import normalize from '../utils/helpers/dimen';
import {Colors, Fonts, Icons} from '../themes/ImagePath';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import MyStatusBar from '../utils/MyStatusBar';

export default function UpdateFirmware({title, des}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar backgroundColor={Colors.black} />
      <View style={styles.topView}>
        <Image source={Icons.logoCircle} style={styles.circleImage} />
        <Text style={styles.title1}>{title}</Text>
        {des ? <Text style={[styles.subtitle]}>{des} </Text> : null}
        <View style={styles.progress}>
          <Progress.Bar
            progress={0.6}
            width={309}
            color={'#FFC211'}
            unfilledColor={'#333333'}
            borderWidth={0}
            height={2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  progress: {
    marginBottom: 50,
  },
  topView: {
    // padding: normalize(15),
    //marginTop: 90,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    height: '100%',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 20,
  },
  title1: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 15,
    marginTop: normalize(60),
    textTransform: 'capitalize',
    fontFamily: Fonts.RobotoBold,
    textAlign: 'center',
  },
  subtitle: {
    color: '#929292',
    fontSize: 13,
    marginBottom: 45,
    // textTransform: 'capitalize',
  },
  circleImage: {
    width: normalize(280),
    height: normalize(280),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: normalize(70),
  },
});
