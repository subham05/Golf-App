import {StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import React from 'react';
import Buttons from '../components/Buttons';
import normalize from '../utils/helpers/dimen';
import {Icons} from '../themes/ImagePath';
import {useNavigation} from '@react-navigation/native';

export default function ConfirmConnection() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image source={Icons.yellowCirclelogo} style={styles.circleImage} />
        <Text style={styles.title1}>Successfully Paired</Text>
        <Text style={styles.subtitle}>Your Device is Connected</Text>
        <View style={{position: 'absolute', bottom: 200, width: '100%'}}>
          <Buttons
            text={'Done'}
            onPress={() => navigation.navigate('CourseSearch')}
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

  topView: {
    padding: normalize(15),
    marginTop: 90,
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  title1: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 15,
    marginTop: 90,
  },
  subtitle: {
    color: '#929292',
    fontSize: 13,
    marginBottom: 45,
  },
  circleImage: {
    height: 327,
    width: 327,
    resizeMode: 'contain',
  },
});
