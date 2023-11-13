import React, {Fragment, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Button from '../../components/Button';
import Realm from 'realm';
import {useDispatch, useSelector} from 'react-redux';
import {devicefirmwareVersionDetailsRequest} from '../../redux/Reducer/GolfCourseReducer';
import Modal from 'react-native-modal';
import showErrorAlert from '../../utils/helpers/Toast';
import SafeView from '../../components/SafeView';
import Loader from '../../utils/helpers/Loader';
import RNFetchBlob from 'rn-fetch-blob';
import {BleContext} from '../../utils/helpers/BleBoundary';
import {useIsFocused} from '@react-navigation/native';
var base64js = require('base64-js');

let status = '';

let realm = new Realm({path: 'Powakaddy.realm'});
export default function Newfirmwireupdate(props) {
  const isFocused = useIsFocused();
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));
  // console.log('deviceObj', deviceObj);
  // console.log('BASE 64', base64js);
  const context = useContext(BleContext);
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const dispatch = useDispatch();
  const [versionServer, setVServer] = useState();
  const [errorMsg, setError] = useState('');
  const [arr, setarr] = useState([
    {
      txt: 'The software update may take several minutes. Your trolley and phone must remain close together until the update is complete.',
    },
    {
      txt: 'Press the <<Next>> button below to proceed with the software update.',
    },
  ]);
  const [check, setCheck] = useState(false);

  const [updateInit, setUpdateInit] = useState();

  const [modalview, setModal] = useState(false);
  function renderItem({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: normalize(10),
          width: '100%',
        }}>
        <View
          style={{
            width: normalize(1),
            height: '130%',
            backgroundColor:
              index == arr.length - 1 ? '#FFC211' : Colors.yellow,
            marginRight: normalize(10),
            marginLeft: normalize(4),
          }}></View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.roundview} />
          <Text style={styles.txtbody}>{item?.txt}</Text>
        </View>
      </View>
    );
  }
  useEffect(() => {
    context.getDevicceMTU(deviceObj[0]?.id, res => {
      console.log('reMTUGATT=========', res);
    });
  }, [isFocused]);
  let deviceName = deviceObj[0]?.bluetoothName
    .replace(/-/g, '')
    .replace(/ /g, '');
  let filename =
    'FW_' +
    GolfCourseReducer?.devicefirmwareVersionRes?.firmwareVersion.concat(
      '_' + deviceName,
    );

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
    console.log('-----FW curr', _currentVersion);
    console.log('-----FW latest', _latestVersion);
    if (_currentVersion < _latestVersion) {
      setCheck(true);
    } else if (_currentVersion >= _latestVersion) {
      setCheck(false);
    }
  };

  const androidUpdate = url => {
    try {
      const {dirs} = RNFetchBlob.fs;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', url, {})
        .then(res => {
          console.log('Response For Android', res);
          res?.base64().then(e => {
            let array = base64js.toByteArray(e);
            fireWareUpdate(array);
          });
        })
        .catch(e => {
          console.log('e : ', e);
        });
    } catch {
      e => {
        console.log(e);
      };
    }
  };

  const iosUpdate = (url, fileName) => {
    try {
      const {dirs} = RNFetchBlob.fs;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: fileName,
        path: `${dirs.DocumentDir}/${fileName}`,
      };
      const configOptions = Platform.select({
        ios: {
          fileCache: configfb.fileCache,
          title: configfb.title,
          path: configfb.path,
          appendExt: 'bin',
        },
      });
      RNFetchBlob.config(configOptions)
        .fetch('GET', url, {})
        .then(res => {
          res?.base64().then(e => {
            let arr = base64js.toByteArray(e);
            fireWareUpdate(arr);
          });
        })
        .catch(e => {
          console.log('e', e);
        });
    } catch (ex) {
      console.log('EX', ex);
    }
  };

  const updateFirmwareVersionDevice = () => {
    if (deviceObj[0]?.bluetoothName == 'POWAKADDY [035]') {
      if (Platform.OS == 'android') {
        console.log(
          '----,version',
          GolfCourseReducer?.devicefirmwareVersionRes,
        );
        androidUpdate(GolfCourseReducer?.devicefirmwareVersionRes?.firmwareUrl);
      } else {
        iosUpdate(
          GolfCourseReducer?.devicefirmwareVersionRes?.firmwareUrl,
          filename,
        );
      }
    }
  };

  const fireWareUpdate = arr => {
    // console.log('byteArr for Update', arr);
    console.log('Update Initiated');
    setUpdateInit(true);

    props.navigation.navigate('Updatingfirmware', {byteArray: arr});
  };

  if (status == '' || GolfCourseReducer?.status !== status) {
    switch (GolfCourseReducer?.status) {
      case 'GolfCourse/devicefirmwareVersionDetailsRequest':
        status = GolfCourseReducer?.status;
        break;

      case 'GolfCourse/devicefirmwareVersionDetailsSuccess':
        status = GolfCourseReducer?.status;
        checkingVerison();
        break;

      case 'GolfCourse/devicefirmwareVersionDetailsFailure':
        status = GolfCourseReducer?.status;
        setError('Something went wrong');
        break;
    }
  }

  return (
    <SafeView color={Colors.black}>
      <MyStatusBar backgroundColor={Colors.black} />
      <Loader visible={updateInit == false} />
      <View style={styles.parentview}>
        <View
          style={{
            width: '100%',
            height: '15%',

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backview}>
            <Image source={Icons.downarrow} style={styles.backimg} />
          </TouchableOpacity>
          <Image source={Icons.logo} style={styles.logoview} />
        </View>
        <View style={styles.mainview}>
          <View>
            <Text style={styles.txtwelcome}>
              {check
                ? 'New firmware update Available'
                : 'The firmware is up to date'}
            </Text>
            <FlatList
              data={arr}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{marginBottom: normalize(40)}}>
            <Button
              backgroundColor={Colors.lightblack}
              title={'CANCEL'}
              marginTop={normalize(10)}
              textColor={Colors.white}
              titlesingle={true}
              fontFamily={Fonts.RobotoMedium}
              fontSize={normalize(16)}
              fontWeight="500"
              borderWidth={0.5}
              borderColor={Colors.white}
              letterSpacing={2}
              onPress={() => props.navigation.goBack()}
            />
            <Button
              backgroundColor={check ? Colors.yellow : Colors.darkGrey}
              title={'NEXT'}
              marginTop={normalize(15)}
              textColor={check ? Colors.black : Colors.white}
              titlesingle={true}
              fontFamily={Fonts.RobotoMedium}
              fontSize={normalize(16)}
              fontWeight="500"
              letterSpacing={2}
              disabled={check ? false : true}
              onPress={() => {
                setUpdateInit(false);
                updateFirmwareVersionDevice();
                // checkingFunc();
              }}
            />
          </View>

          {/* <Modal
            // transparent={true}
            isVisible={modalview}
            // animationIn="fadeIn"
            // animationOut="fadeOut"
            // onBackButtonPress={() => setModal(false)}
            onBackdropPress={() => setModal(false)}
            animationType={'fade'}
            style={{
              width: '100%',
              height: '100%',
              alignSelf: 'center',
              margin: 0,
              // backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#111111',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: normalize(20),
                width: Platform.OS == 'ios' ? normalize(180) : normalize(200),
                height: Platform.OS == 'ios' ? normalize(110) : normalize(130),
                alignSelf: 'center',
                borderRadius: normalize(20),
                borderColor: Colors.darkGrey,
                borderWidth: 1,
                // shadowColor: Colors.white,
                // shadowOffset: {height: 0, width: 0},
                // shadowOpacity: 0.2,
                // // shadowRadius:5,
                // elevation: 10,
                // flex: 1,
              }}>
              {!errorMsg && (
                <ActivityIndicator size={50} color={Colors.primary} />
              )}
              {!errorMsg && (
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: Fonts.RobotoMedium,
                    fontSize: normalize(13),
                    marginTop: normalize(10),
                  }}>
                  Please wait...
                </Text>
              )}
              {errorMsg && (
                <Image
                  source={Icons.MaxCourse}
                  style={{
                    width: normalize(40),
                    height: normalize(40),
                    resizeMode: 'contain',
                  }}
                />
              )}
              {errorMsg && (
                <Text
                  style={{
                    color: '#929292',
                    fontFamily: Fonts.RobotoRegular,
                    fontSize: normalize(12),
                    marginTop: normalize(10),
                    textAlign: 'center',
                  }}>
                  {errorMsg}
                </Text>
              )}
            </View>
          </Modal> */}
        </View>
      </View>
    </SafeView>
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
    height: '85%',
    borderTopRightRadius: normalize(30),
    borderTopLeftRadius: normalize(30),
    paddingHorizontal: normalize(15),
    paddingTop: normalize(20),
    justifyContent: 'space-between',
  },
  backview: {
    position: 'absolute',
    height: normalize(35),
    width: normalize(35),
    left: normalize(15),

    justifyContent: 'center',
  },
  backimg: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  txtwelcome: {
    color: Colors.white,
    fontSize: normalize(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    textTransform: 'uppercase',
  },
  roundview: {
    width: normalize(6),
    height: normalize(6),
    backgroundColor: Colors.yellow,
    borderRadius: normalize(4),
    //   position: 'absolute',
    marginLeft: normalize(-14),
    zIndex: 1,
    marginTop: normalize(6),
  },
  txtbody: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    marginLeft: normalize(10),
  },
});
