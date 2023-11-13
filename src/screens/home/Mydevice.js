import React, {Fragment, useEffect, useState} from 'react';
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
import Realm from 'realm';
import {useIsFocused} from '@react-navigation/native';
import {horizontalScale, verticalScale} from '../../utils/helpers/size';
import SafeView from '../../components/SafeView';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';

let realm = new Realm({path: 'Powakaddy.realm'});

export default function MyDevice(props) {
  const [DBstatus, setDBstatus] = useState(false);
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const isFocused = useIsFocused();
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));
  // console.log('deviceObj', deviceObj);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (device_all?.length !== 0) {
      if (device_all[0].status == false && global.isStatus == false) {
        setDBstatus(false);
      } else if (device_all[0].status == false && global.isStatus == true) {
        setDBstatus(false);
      } else {
        setDBstatus(true);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      try {
        realm.addListener('change', onRealmChange);
      } catch (error) {
        console.error(
          `An exception was thrown within the change listener: ${error}`,
        );
      }
      return () => {
        realm.removeListener('change', onRealmChange);
      };
    }
  }, [isFocused]);

  useEffect(() => {
    checkingVerison();
  }, []);

  const checkingVerison = () => {
    let _currentVersion = deviceObj[0]?.deviceVersion?.replace(/\./g, '');
    let _latestVersion =
      GolfCourseReducer?.devicefirmwareVersionRes?.firmwareVersion?.replace(
        /\./g,
        '',
      );

    if (_currentVersion <= _latestVersion) {
      setCheck(true);
    } else if (_currentVersion > _latestVersion) {
      setCheck(false);
    }
  };

  function onRealmChange() {
    setTimeout(() => {
      // getDeviceAllStatus(global.Allproducts);
      console.log('Changes are done');
      if (device_all?.length !== 0) {
        if (device_all[0].status == false && global.isStatus == false) {
          setDBstatus(false);
        } else if (device_all[0].status == false && global.isStatus == true) {
          setDBstatus(false);
        } else {
          setDBstatus(true);
        }
      }
    }, 1000);
  }

  return (
    <SafeView color={Colors.black}>
      <MyStatusBar backgroundColor={Colors.black} />
      <View style={styles.parentview}>
        <View style={{backgroundColor: Colors.black}}>
          <Header line={false} />
        </View>
        <View style={styles.mainRow}>
          <View
            style={[
              styles.statusView,
              {
                backgroundColor: DBstatus ? Colors.green : Colors.red,
                height: normalize(40),
                paddingVertical: 0,
              },
            ]}>
            <Text
              style={[
                styles.connected,
                {
                  fontSize: normalize(10),
                  fontFamily: Fonts.RobotoMedium,
                },
              ]}>
              {DBstatus ? 'Connected' : 'Disconnected'}
            </Text>
            {DBstatus && check && (
              <TouchableOpacity
                style={[styles.innerRow, {marginLeft: normalize(8)}]}
                onPress={() => props.navigation.navigate('Newfirmwireupdate')}>
                <View style={styles.circle}>
                  <Text
                    style={[
                      styles.connected,
                      {fontFamily: Fonts.RobotoMedium},
                    ]}>
                    !
                  </Text>
                </View>
                <Text style={[styles.update, {fontFamily: Fonts.RobotoMedium}]}>
                  Update Available...
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={[
              styles.batteryView,
              {height: normalize(40), paddingVertical: 0},
            ]}>
            <Image
              source={DBstatus ? Icons.battery : Icons.batterygrey}
              style={[
                styles.battery,
                {height: normalize(10), resizeMode: 'stretch'},
              ]}
            />
          </View>
        </View>
        <View style={styles.mainview}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: normalize(15)}}>
            <View>
              <Text style={styles.txthead}>connect to your PowaKaddy</Text>
              <Text style={styles.txtbody}>
                {
                  'Before we start you need to make sure your trolley is powered on and you have the <<Pair>> setting active..'
                }
              </Text>

              <Image source={Icons.connectbottom} style={styles.bodyimg} />
              <Text style={[styles.txtbody, {textAlign: 'center'}]}>
                Settings - Trolley Settings - Bluetooth - Pair New Device For
                older models follow
              </Text>
              <Image source={Icons.connecttop} style={styles.bodyimg} />
              <Text style={[styles.txtbody, {textAlign: 'center'}]}>
                {'Settings - Connectivity'}
              </Text>
            </View>
            <View
              style={{marginBottom: normalize(40), marginTop: normalize(30)}}>
              <Button
                backgroundColor={!DBstatus ? Colors.yellow : '#413F3F'}
                title={'PAIR DEVICE'}
                disabled={!DBstatus ? false : true}
                marginTop={normalize(10)}
                textColor={!DBstatus ? Colors.black : Colors.white}
                titlesingle={true}
                fontFamily={Fonts.RobotoMedium}
                fontSize={normalize(13)}
                fontWeight="500"
                letterSpacing={2}
                onPress={() => props.navigation.navigate('Searching')}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  logoview: {
    width: '25%',
    height: '25%',
    resizeMode: 'stretch',
  },
  parentview: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
  },
  mainview: {
    backgroundColor: Colors.lightblack,
    height: '80%',
    borderTopRightRadius: normalize(30),
    borderTopLeftRadius: normalize(30),
    paddingHorizontal: normalize(15),
    paddingTop: normalize(20),
    justifyContent: 'space-between',
  },
  txtbody: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    marginTop: normalize(10),
    // marginLeft: normalize(10),
  },
  txthead: {
    color: Colors.white,
    fontSize: normalize(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    textTransform: 'uppercase',
    letterSpacing: normalize(1),
  },
  bodyimg: {
    width: normalize(200),
    height: normalize(120),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  backbuttonview: {
    position: 'absolute',
    left: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backbutton: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  navBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',

    marginTop: Platform.OS == 'ios' ? 0 : normalize(15),
    height: normalize(70),
  },
  back: {
    height: horizontalScale(10),
    width: verticalScale(10),
    resizeMode: 'contain',
  },
  logo: {
    height: horizontalScale(31.4),
    width: verticalScale(150),
    resizeMode: 'contain',
  },
  backBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? normalize(-10) : 0,
  },
  mainRow: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statusView: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  connected: {
    color: Colors.white,
    fontSize: 11,
    // fontWeight: '500',
  },
  batteryView: {
    width: '19%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.black2,
    paddingVertical: 25,
  },
  battery: {
    height: 12.63,
    width: 24,
    resizeMode: 'contain',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  update: {color: Colors.white, fontSize: 12, fontWeight: '500'},
});
