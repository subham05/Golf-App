import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../../components/Button';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {TextInput} from 'react-native-gesture-handler';
import Toast from '../../utils/helpers/Toast';
import _ from 'lodash';
import Picker from '../../components/Picker';
import {useDispatch, useSelector} from 'react-redux';
import {DeviceDetailRequest} from '../../redux/Reducer/AuthReducer';
import Realm from 'realm';

let status = '';
let realm = new Realm({path: 'Powakaddy.realm'});

export default function Selectgpsversion(props) {
  const {devices} = props.route.params;
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [SerialNumber, setSerialNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));

  const dispatch = useDispatch();

  useEffect(() => {
    // 'PowaKaddy Trolley', 'PowaKaddy'
    if (devices) {
      let temp = devices.map((item, index) => ({
        ...item,
        label:
          item.name.trim() == 'PowaKaddy Trolley'
            ? 'V0022 or Higher'
            : item.name.trim() == 'POWAKADDY [035]'
            ? 'V0035'
            : item.name.trim() == 'POWAKADDY'
            ? 'V0018 or Lower'
            : 'V0022 & Above',
        value: index,
      }));
      setData(temp);
    }
  }, [devices]);

  // console.log('navigate -- focus --> 1');

  const handleSubmit = () => {
    if (value == '') {
      Toast('Please select device version.');
    } else if (SerialNumber == '') {
      Toast('Please enter Serial Number.');
    } else if (SerialNumber !== '') {
      if (value == 'V0022 or Higher' || value == 'V0035') {
        // Nordic | Whistable
        if (SerialNumber == 'N') {
          let obj = {
            version: value,
            serial_number: SerialNumber,
          };

          // console.log('navigate -- Successfulpaired --> 1');

          // dispatch(DeviceDetailRequest(obj));
          props.navigation.navigate('Successfulpaired', {
            device: deviceDetails,
          });
        } else {
          Toast('Please enter correct Serial Number.');
        }
      } else if (value == 'V0018 or Lower') {
        // Epson

        if (SerialNumber == 'N') {
          let obj = {
            version: value,
            serial_number: SerialNumber,
          };
          // dispatch(DeviceDetailRequest(obj));
          // console.log('navigate -- Successfulpaired --> 2');
          props.navigation.navigate('Successfulpaired', {
            device: deviceDetails,
          });
        } else {
          Toast('Please enter correct Serial Number.');
        }
        // console.log('here3');
      }
    }
  };

  if (status == '' || AuthReducer?.status !== status) {
    switch (AuthReducer?.status) {
      case 'Auth/DeviceDetailRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/DeviceDetailSuccess':
        status = AuthReducer?.status;
        props.navigation.navigate('Successfulpaired', {
          device: deviceDetails,
        });
        break;

      case 'Auth/DeviceDetailFailure':
        status = AuthReducer?.status;
        break;
    }
  }

  return (
    <>
      <MyStatusBar backgroundColor={Colors.black} />
      <View style={[styles.parentview]}>
        <View
          style={{
            width: '100%',
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Connecttoyou');
            }}
            style={styles.backview}>
            <Image source={Icons.downarrow} style={styles.backimg} />
          </TouchableOpacity>
          <Image source={Icons.logo} style={styles.logoview} />
        </View>
        <View style={styles.mainview}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom:
                Platform.OS == 'android' ? normalize(20) : normalize(130),
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}>
            <View>
              <Text style={styles.txthead}>Select GPS version</Text>
              <Text style={styles.txtbody}>
                {
                  'Welcome to the PowaKaddy Mobile Application.Your GPS trolley comes with free access to course updates. Select GPS version below to connecting to your GPS trolley.'
                }
              </Text>

              <Image source={Icons.selectgps} style={styles.bodyimg} />

              <Text style={styles.txtsetting}>{'Settings - GPS Version'}</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              style={{
                flex: 1,
                marginBottom: normalize(110),
                marginTop: normalize(30),
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => setIsVisible(!isVisible)}
                  style={{
                    height: normalize(40),
                    borderWidth: 0.5,
                    borderColor: Colors.white,
                    borderRadius: normalize(6),
                    marginTop: normalize(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: normalize(14),
                      fontFamily: Fonts.RobotoBold,
                      color:
                        value !== '' || isVisible ? Colors.yellow : 'white',
                    }}>
                    {value !== ''
                      ? value
                      : isVisible
                      ? '...'
                      : 'Select Version'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsVisible(!isVisible)}
                    style={{
                      position: 'absolute',
                      right: normalize(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}>
                    <Image
                      style={{
                        height: normalize(15),
                        width: normalize(15),
                        resizeMode: 'contain',
                      }}
                      source={Icons.downarrow}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <Picker
                  isVisible={isVisible}
                  onBackdropPress={() => setIsVisible(false)}
                  data={data}
                  onPress={item => {
                    setValue(item.label);
                    setDeviceDetails(item);
                  }}
                />
              </View>

              <TextInput
                placeholder="Device Serial Number"
                placeholderTextColor={Colors.white}
                textAlign="center"
                align
                value={SerialNumber}
                onChangeText={val => {
                  setSerialNumber(val);
                }}
                style={{
                  height: normalize(40),
                  borderWidth: 0.5,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  borderColor: Colors.white,
                  borderRadius: normalize(6),
                  marginTop: normalize(10),
                  // fontWeight: 'bold',
                  color: Colors.white,
                  fontFamily: Fonts.RobotoBold,
                }}
              />
              <Button
                backgroundColor={Colors.lightblack}
                title={'CANCEL'}
                marginTop={normalize(10)}
                textColor={Colors.white}
                titlesingle={true}
                fontFamily={Fonts.RobotoMedium}
                fontSize={normalize(14)}
                fontWeight="500"
                borderWidth={0.5}
                borderColor={Colors.white}
                letterSpacing={2}
                onPress={() => {
                  if(deviceObj?.length > 0){
                    props.navigation.navigate('MyDevice')
                  }else{
                    props.navigation.navigate('Connecttoyou');
                  }
                }}
              />
              <Button
                backgroundColor={value ? Colors.yellow : '#413F3F'}
                title={'SUBMIT'}
                marginTop={normalize(10)}
                textColor={value ? Colors.black : Colors.white}
                titlesingle={true}
                fontFamily={Fonts.RobotoMedium}
                fontSize={normalize(14)}
                fontWeight="500"
                letterSpacing={2}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoview: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    marginTop: Platform.OS == 'ios' ? normalize(20) : normalize(30),
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
  txtsetting: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    marginTop: normalize(10),
    textAlign: 'center',
    // marginLeft: normalize(10),
  },
  bodyimg: {
    width: normalize(200),
    height: normalize(120),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: normalize(15),
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
  backimg: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  backview: {
    position: 'absolute',
    left: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: normalize(40),
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    borderRadius: normalize(6),
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    textAlign: 'center',
    fontSize: normalize(14),
    fontFamily: Fonts.RobotoBold,
    color: Colors.white,
  },
  selectedTextStyle: {
    alignSelf: 'center',
    textAlign: 'center',

    fontSize: normalize(14),
    fontFamily: Fonts.RobotoBold,
    color: Colors.yellow,
  },
});
