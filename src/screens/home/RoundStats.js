//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import SafeView from '../../components/SafeView';

// create a component
const RoundStats = ({navigation}) => {
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <Text
          style={[
            styles.title,
            {fontFamily: Fonts.RobotoBold, letterSpacing: 2},
          ]}>
          ROUND STATS
        </Text>
        <View style={styles.mainView}>
          <View style={styles.headRow}>
            <View style={styles.innerRow}>
              <Image source={Icons.calendar} style={styles.calendar} />
              <Text style={[styles.date, {fontFamily: Fonts.RobotoRegular}]}>
                07 Dec 2022
              </Text>
            </View>
            <Text style={[styles.value, {fontFamily: Fonts.RobotoMedium}]}>
              +15
            </Text>
          </View>
          <View style={styles.mainRow}>
            <Text style={[styles.name, {fontFamily: Fonts.RobotoRegular}]}>
              Round Time
            </Text>
            <Text style={[styles.value, {fontFamily: Fonts.RobotoMedium}]}>
              04:21pm
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.mainRow}>
            <Text style={[styles.name, {fontFamily: Fonts.RobotoRegular}]}>
              Round Distance
            </Text>
            <Text style={[styles.value, {fontFamily: Fonts.RobotoMedium}]}>
              7821Y
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.mainRow}>
            <Text style={[styles.name, {fontFamily: Fonts.RobotoRegular}]}>
              Average Putts
            </Text>
            <Text style={[styles.value, {fontFamily: Fonts.RobotoMedium}]}>
              2.2
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.mainRow}>
            <Text style={[styles.name, {fontFamily: Fonts.RobotoRegular}]}>
              Fairways Hit
            </Text>
            <Text style={[styles.value, {fontFamily: Fonts.RobotoMedium}]}>
              65%
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.mainRow}>
            <Text style={styles.name}>Gir</Text>
            <Text style={[styles.value, {fontFamily: Fonts.RobotoMedium}]}>
              70%
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </SafeView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  navBar: {
    // height: '15%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    alignSelf: 'center',
  },
  back: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  mainView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    height: 31.4,
    width: 150,
    resizeMode: 'contain',
    // position: 'absolute',
    // alignSelf: 'center',
  },
  headRow: {
    width: '95%',
    paddingVertical: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.black2,
    borderRadius: 7,
  },
  mainRow: {
    width: '95%',
    paddingVertical: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  separator: {
    width: '90%',
    borderTopWidth: 1,
    borderTopColor: Colors.black2,
    marginVertical: 5,
    alignSelf: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  date: {
    fontSize: 13,
    color: Colors.white,
  },
  title: {
    fontSize: 15,
    color: Colors.white,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  name: {
    fontSize: 14,
    color: Colors.white,
    // fontWeight: '600',
    fontFamily: Fonts.RobotoRegular,
  },
  value: {
    fontSize: 14,
    color: Colors.primary,
    // fontWeight: 'bold',
  },
  calendar: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
});

//make this component available to the app
export default RoundStats;
