import React, {Fragment, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import Modal from 'react-native-modal';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Button from '../../components/Button';
import TextInputItem from '../../components/TextInputItem';

import {
  UpdateUserRequest,
  UserDetailRequest,
  resendemailRequest,
  signupRequest,
  logoutRequest,
  increaseCount,
} from '../../redux/Reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import {horizontalScale} from '../../utils/helpers/size';
import {BleContext} from '../../utils/helpers/BleBoundary';
import Realm from 'realm';
import BigHeader from '../../components/BigHeader';

let status = '';

export default function MyAccount(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [count, setCount] = useState(0);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  // console.log('EMIA', email);
  const [handicap, setHandicap] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostCode] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const context = useContext(BleContext);
  let realm = new Realm({path: 'Powakaddy.realm'});
  const device_all = realm?.objects('bluetooth_devices');
  const deviceObj = JSON.parse(JSON.stringify(device_all));
  const [check, setCheck] = useState(false);
  const [modalview, setmodal] = useState(false);
  const [iconvisible, seticonvisible] = useState(true);
  const [pass, setPass] = useState(false);
  // console.log('PASS+++', pass);
  const dispatch = useDispatch();

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const number = /^[0-9]*$/;
  const regexPhone = /^(?![.-])\d{8,}$/;
  function updateaccount() {
    if (firstname == '') {
      showErrorAlert('Please enter your first name');
    } else if (lastname == '') {
      showErrorAlert('Please enter your last name');
    } else if (email == '') {
      showErrorAlert('Please enter your email');
    } else if (handicap == '') {
      showErrorAlert('Enter your Handicapped number');
    } else if (country == '') {
      showErrorAlert('Please Enter Country');
    } else if (phone == '') {
      showErrorAlert('Please enter your phone number');
    } else if (!regexPhone.test(phone)) {
      showErrorAlert('Please Enter Correct Phone Number');
    }
    // else if (!number.test(handicap)) {
    //   showErrorAlert('Please Enter a number in handicap');
    // }
    // else if (gender == '') {
    //   showErrorAlert('Please select your gender');
    // }
    //       else if (pin == '') {
    //   showErrorAlert('Please enter zipcode')
    //  }
    //       else if (selected == '') {
    //   showErrorAlert('Please select country')
    //  }
    else {
      // console.log('HELLLP222');
      setPass(true);
      let obj = {
        first_name: firstname,
        last_name: lastname,
        country: country,
        handicap: handicap,
        address_line_1: address1,
        address_line_2: address2,
        city: city,
        postal_code: postcode,
        phone: phone,
      };
      connectionrequest()
        .then(() => {
          // console.log(obj, '+++++++++++++++');
          dispatch(UpdateUserRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(UserDetailRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, []);
  useEffect(() => {
    if (AuthReducer?.count != count) {
      setPass(true);
    }
  }, [count]);
  useEffect(() => {
    if (AuthReducer?.status == 'Auth/UserDetailSuccess') {
      setFirstname(AuthReducer?.userDetailsResponse?.data[0]?.first_name);
      setLastname(AuthReducer?.userDetailsResponse?.data[0]?.last_name);
      setEmail(AuthReducer?.userDetailsResponse?.data[0]?.email);
      setHandicap(AuthReducer?.userDetailsResponse?.data[0]?.handicap);
      setCountry(AuthReducer?.userDetailsResponse?.data[0]?.country);
      setCity(AuthReducer?.userDetailsResponse?.data[0]?.city);
      setPostCode(AuthReducer?.userDetailsResponse?.data[0]?.postal_code);
      setPhone(AuthReducer?.userDetailsResponse?.data[0]?.phone);
      setAddress1(AuthReducer?.userDetailsResponse?.data[0]?.address_line_1);
      setAddress2(AuthReducer?.userDetailsResponse?.data[0]?.address_line_2);
    }
  }, [AuthReducer?.status]);

  if (status == '' || AuthReducer?.status !== status) {
    switch (AuthReducer?.status) {
      case 'Auth/UpdateUserRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/UpdateUserSuccess':
        status = AuthReducer?.status;
        dispatch(increaseCount(count));
        connectionrequest()
          .then(() => {
            dispatch(UserDetailRequest());
          })
          .catch(err => {
            showErrorAlert('Please connect To Internet');
          });

        setPass(false);
        break;

      case 'Auth/UpdateUserFailure':
        status = AuthReducer?.status;
        break;

      case 'Auth/UserDetailRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/UserDetailSuccess':
        status = AuthReducer?.status;
        break;

      case 'Auth/UserDetailFailure':
        status = AuthReducer?.status;
        break;
    }
  }

  const handleLogout = () => {
    Alert.alert(
      'Powakaddy',
      'Are you sure want to logout ?',
      [
        {text: 'No', onPress: () => {}},
        {
          text: 'Yes',
          onPress: () => {
            disconnectAllDevice();
          },
          style: 'default',
        },
      ],
      {cancelable: false},
    );
  };

  const disconnectAllDevice = () => {
    if (deviceObj?.length !== 0) {
      for (let i = 0; i < deviceObj?.length; i++) {
        unpairDevice(deviceObj[i]?.id);
      }
      realm.write(() => {
        realm.delete(realm.objects('bluetooth_devices'));
      });

      dispatch(logoutRequest());
      setTimeout(() => {
        props.navigation.reset({routes: [{name: 'Signin'}]});
      }, 1000);
    } else {
      dispatch(logoutRequest());
      setTimeout(() => {
        props.navigation.reset({routes: [{name: 'Signin'}]});
      }, 1000);
    }
  };

  const unpairDevice = _id => {
    if (Platform.OS == 'android') {
      context.getAllBondedPeripherals(res => {
        if (res?.length !== 0) {
          var result = res.filter(i => i.id == _id);
          if (result?.length !== 0) {
            context.removeBond(_id, res1 => {
              if (res1 !== false) {
                console.log('Unpair Success in Android');
              }
            });
          }
        }
      });
    } else {
      context.disconnect(_id, res => {
        if (res !== false) {
          console.log('Unpair Success in IOS');
        }
      });
    }
  };
  return (
    <>
      <SafeView color={Colors.black}>
        <MyStatusBar backgroundColor={Colors.black} />
        <Loader
          visible={
            AuthReducer.status == 'Auth/UpdateUserRequest' ||
            AuthReducer.status == 'Auth/UserDetailRequest'
          }
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={styles.parentview}>
            <BigHeader />
            {/* <View
              style={{
                width: '100%',
                height: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={Icons.logo} style={styles.logoview} />
            </View> */}
            <View>
              <Text style={styles.txtwelcome}>My Account</Text>

              <TextInputItem
                viewbordercolor="red"
                placeholder={'First Name'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={firstname}
                onChangeText={val => {
                  setCount(count + 1);
                  setFirstname(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Surname'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={lastname}
                onChangeText={val => {
                  setCount(count + 1);
                  setLastname(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Email'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={email}
                onChangeText={val => setEmail(val)}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
                editable={false}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Handicap'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={handicap}
                onChangeText={val => {
                  setCount(count + 1);
                  setHandicap(val);
                }}
                keyboardType={'numeric'}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Country'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={country}
                onChangeText={val => {
                  setCount(count + 1);
                  setCountry(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />

              <Text style={styles.optionText}>*Optional</Text>
              <TextInputItem
                viewbordercolor="red"
                placeholder={'*Address1'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={address1}
                onChangeText={val => {
                  setCount(count + 1);
                  setAddress1(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'*Address2'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={address2}
                onChangeText={val => {
                  setCount(count + 1);
                  setAddress2(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'*Town/City'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={city}
                onChangeText={val => {
                  setCount(count + 1);
                  setCity(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'*PostCode'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={postcode}
                onChangeText={val => {
                  setCount(count + 1);
                  setPostCode(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                maxLength={17}
                viewbordercolor="red"
                placeholder={'*Phone Number'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={phone}
                keyboardType={'numeric'}
                onChangeText={val => {
                  setCount(count + 1);
                  setPhone(val);
                }}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <Button
                backgroundColor={pass ? Colors.yellow : Colors.grey}
                title={'SAVE'}
                marginTop={normalize(10)}
                marginBottom={normalize(15)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => updateaccount()}
                disabled={pass ? false : true}
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />
              <TouchableOpacity onPress={handleLogout}>
                <Text
                  style={{
                    color: Colors.yellow,
                    textDecorationLine: 'underline',
                    fontFamily: Fonts.RobotoRegular,
                    marginBottom: normalize(10),
                    fontSize: normalize(12),
                  }}>
                  Sign Out
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ChangeLoginDetails')}>
                <Text
                  style={{
                    color: Colors.yellow,
                    textDecorationLine: 'underline',
                    fontFamily: Fonts.RobotoRegular,
                    fontSize: normalize(12),
                  }}>
                  Change Log In Details
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  logoview: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  backview: {
    position: 'absolute',
    left: normalize(0),
    height: normalize(35),
    width: normalize(35),
    justifyContent: 'center',
  },
  backimg: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
  },
  parentview: {
    flexGrow: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(160),
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
  txtwelcome: {
    color: Colors.white,
    fontSize: normalize(14),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    marginBottom: normalize(10),
  },
  paginationround: {
    width: normalize(4),
    height: normalize(4),
    borderRadius: normalize(2),
    backgroundColor: Colors.grey,
  },
  paginationline: {
    width: normalize(16),
    height: normalize(4),
    backgroundColor: Colors.yellow,
    borderRadius: normalize(2),
    marginRight: normalize(8),
  },
  roundview: {
    width: normalize(8),
    height: normalize(8),
    backgroundColor: Colors.yellow,
    borderRadius: normalize(4),
    //   position: 'absolute',
    marginLeft: normalize(-15),
    zIndex: 1,
    marginTop: normalize(6),
  },
  secondaryBtn: {
    paddingBottom: normalize(14),
  },
  secondarybtnText: {
    color: Colors.yellow,
    fontSize: normalize(14),
    fontFamily: Fonts.RobotoBold,
  },
  aggrementText: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.RobotoMedium,
    marginTop: normalize(16),
    paddingLeft: normalize(4),
  },
  aggrementText1: {
    color: Colors.yellow,
    fontSize: normalize(12),
    fontFamily: Fonts.RobotoMedium,
  },
  textNew: {
    color: Colors.white,
    fontSize: normalize(14),
    fontFamily: Fonts.RobotoBold,
  },
  bottomView: {
    marginVertical: normalize(30),

    alignItems: 'center',
  },
  optionText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    color: Colors.white,
    alignSelf: 'flex-end',
    marginBottom: normalize(4),
  },
  checkView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginVertical: normalize(10),
  },
  icon: {
    height: normalize(13),
    width: normalize(13),
    resizeMode: 'contain',
  },
  termsText: {
    width: '88%',
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    color: Colors.white,
    alignSelf: 'flex-end',
    marginLeft: normalize(10),
  },
  linkText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    color: Colors.yellow,
  },
  innerBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
