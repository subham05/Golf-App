import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import SafeView from '../../components/SafeView';
export default function Firmwareupdatesuccessfully(props) {
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.black} />
        <View style={styles.parentview}>
          <View
            style={{
              width: '100%',
              height: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SupportScreen')}
              style={styles.backview}>
              <Image source={Icons.downarrow} style={styles.backimg} />
            </TouchableOpacity>
            <Image source={Icons.logo} style={styles.logoview} />
          </View>
          <View style={styles.mainview}>
            {/* <ScrollView> */}
            <View>
              <View style={styles.bodyimgview}>
                <Image source={Icons.firmwareupdate} style={styles.bodyimg} />
              </View>
              <Text style={styles.txtfirmwareupdate}>
                Firmware Update Successfully
              </Text>
              <Text style={styles.txtbody}>
                {'The software update has been transferred to your trolley.'}
              </Text>
            </View>
            <View
              style={{marginBottom: normalize(40), marginTop: normalize(30)}}>
              <Button
                backgroundColor={Colors.yellow}
                title={'DONE'}
                marginTop={normalize(10)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoMedium}
                fontSize={normalize(14)}
                fontWeight="500"
                letterSpacing={2}
                onPress={() => props.navigation.navigate('SupportScreen')}
              />
            </View>
            {/* </ScrollView> */}
          </View>
        </View>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  logoview: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  parentview: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
  },
  mainview: {
    backgroundColor: Colors.lightblack,
    height: '75%',
    borderTopRightRadius: normalize(30),
    borderTopLeftRadius: normalize(30),
    paddingHorizontal: normalize(15),
    paddingTop: normalize(20),
    justifyContent: 'space-between',
  },
  backview: {
    position: 'absolute',
    left: normalize(15),

    justifyContent: 'center',
    height: normalize(35),
    width: normalize(35),
  },
  backimg: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  bodyimgview: {
    width: Platform.OS == 'ios' ? normalize(100) : normalize(120),
    height: Platform.OS == 'ios' ? normalize(100) : normalize(120),
    borderRadius: normalize(100),
    backgroundColor: '#2D2B2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(25),
    marginTop: normalize(35),
  },
  bodyimg: {
    width: normalize(55),
    height: normalize(55),
    resizeMode: 'contain',
  },
  txtfirmwareupdate: {
    color: Colors.white,
    fontSize: normalize(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    textTransform: 'uppercase',
    letterSpacing: normalize(1),
  },
  txtbody: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    lineHeight: normalize(20),
    marginTop: normalize(10),
    width: normalize(200),
    // marginLeft: normalize(10),
  },
});
