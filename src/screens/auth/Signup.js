import React, {Fragment, useEffect, useState} from 'react';
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
} from 'react-native';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import Modal from 'react-native-modal';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Button from '../../components/Button';
import TextInputItem from '../../components/TextInputItem';

import {
  resendemailRequest,
  setStatusNull,
  signupRequest,
} from '../../redux/Reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import {horizontalScale} from '../../utils/helpers/size';
import BigHeader from '../../components/BigHeader';
export default function Signup(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handicap, setHandicap] = useState(0);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostCode] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [check, setCheck] = useState(false);
  const [modalview, setmodal] = useState(false);
  const [iconvisible, seticonvisible] = useState(true);
  const dispatch = useDispatch();

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const number = /^[0-9]*$/;
  const regexName = /^[A-Za-z]+([\ A-Za-z]+)*/; ///^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/;
  const regexPhone = /^(?![.-])\d{8,}$/;
  function createaccount() {
    if (firstname == '') {
      showErrorAlert('Please enter your first name');
    } else if (!regexName.test(firstname)) {
      showErrorAlert('Invalid first name');
    }
    //  else if (username == '') {
    //   showErrorAlert('Please enter your User name');
    // }
    else if (lastname == '') {
      showErrorAlert('Please enter your last name');
    } else if (!regexName.test(lastname)) {
      showErrorAlert('Invalid last name');
    } else if (email == '') {
      showErrorAlert('Please enter your email');
    } else if (!regex.test(email)) {
      showErrorAlert('Please enter correct email');
    } else if (password == '') {
      showErrorAlert('Please enter password');
    } else if (password.length < 8) {
      showErrorAlert('Please enter atleast 8 character password');
    } else if (handicap == '') {
      showErrorAlert('Enter your Handicapped number');
    } else if (!number.test(handicap)) {
      showErrorAlert('Please Enter a number in handicap');
    } else if (country == '') {
      showErrorAlert('Please Enter Country');
    } else if (phone == '') {
      showErrorAlert('Please Enter Your Phone Number');
    } else if (!regexPhone.test(phone)) {
      showErrorAlert('Please Enter Correct Phone Number');
    } else if (check == false) {
      showErrorAlert(
        'Please Agree to Powakaddy Terms of Use license agreements',
      );
    } else {
      let obj = {
        first_name: firstname,
        last_name: lastname,
        country: country,
        handicap: handicap,
        email: email,
        password: password,
        address_line_1: address1,
        address_line_2: address2,
        city: city,
        postal_code: postcode,
        phone: phone,
      };

      connectionrequest()
        .then(() => {
          // console.log(obj);
          dispatch(signupRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });

      //console.log(obj);
      // props.navigation.navigate('Signin')
    }
  }
  useEffect(() => {
    if (AuthReducer.status == 'Auth/signupSuccess') {
      setmodal(true);
      dispatch(setStatusNull());
    }
  }, [AuthReducer.status]);
  const Resend = () => {
    obj = {
      email: email,
    };
    connectionrequest()
      .then(() => {
        // console.log(obj);
        dispatch(resendemailRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  };
  return (
    <>
      <SafeView color={Colors.black}>
        <MyStatusBar backgroundColor={Colors.black} />
        <Loader
          visible={
            AuthReducer.status == 'Auth/signupRequest' ||
            AuthReducer.status == 'Auth/resendemailRequest'
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
              <Text style={styles.txtwelcome}>Account</Text>

              <TextInputItem
                viewbordercolor="red"
                placeholder={'First Name'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={firstname}
                onChangeText={val => setFirstname(val)}
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
                onChangeText={val => setLastname(val)}
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
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Password'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(48)}
                borderWidth={1}
                // marginTop={normalize(5)}
                value={password}
                onChangeText={val => setPassword(val)}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={true}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
                rightimage={iconvisible ? Icons.hide : Icons.Show}
                onrightimpress={() => seticonvisible(!iconvisible)}
                isSecure={iconvisible}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Handicap'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={handicap}
                onChangeText={val => setHandicap(val)}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
                keyboardType={'numeric'}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Country'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={country}
                onChangeText={val => setCountry(val)}
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
                onChangeText={val => setAddress1(val)}
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
                onChangeText={val => setAddress2(val)}
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
                onChangeText={val => setCity(val)}
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
                onChangeText={val => setPostCode(val)}
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
                onChangeText={val => setPhone(val)}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <View
                onPress={() => {
                  setCheck(!check);
                }}
                style={styles.checkView}>
                <TouchableOpacity
                  onPress={() => {
                    setCheck(!check);
                  }}>
                  <Image
                    source={check ? Icons.check : Icons.uncheck}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginLeft: normalize(10),
                    // backgroundColor: 'red',
                  }}>
                  <Text style={styles.termsText}>
                    Tick the box to agree to{''}
                  </Text>
                  <TouchableOpacity
                    style={{
                      // backgroundColor:'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginTop:normalize(17)
                    }}>
                    <Text
                      style={[
                        styles.aggrementText1,
                        {fontSize: normalize(11)},
                      ]}>
                      {' '}
                      Powakaddy Terms of Use
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.aggrementText, {marginTop: 0}]}>
                    and{' '}
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[
                        styles.aggrementText1,
                        {color: Colors.yellow, marginTop: 0},
                      ]}>
                      license agreements
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                backgroundColor={Colors.yellow}
                title={'SIGN UP'}
                marginTop={normalize(10)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => createaccount()}
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />
            </View>
          </ScrollView>
          <Modal
            // transparent={true}
            isVisible={modalview}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            onBackButtonPress={() => setmodal(false)}
            onBackdropPress={() => setmodal(false)}
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
                backgroundColor: Colors.lightblack,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: normalize(20),
                width: '90%',
                alignSelf: 'center',
                borderRadius: normalize(20),
                paddingHorizontal: normalize(15),
                // flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  marginTop: normalize(16),
                  marginRight: normalize(16),
                }}
                onPress={() => {
                  dispatch(setStatusNull());
                  setmodal(false);
                }}>
                <Image
                  style={{
                    height: horizontalScale(20),
                    width: horizontalScale(20),
                  }}
                  source={Icons.Cancel}
                />
              </TouchableOpacity>
              <Image
                source={Icons.SendMail}
                style={{
                  width: normalize(70),
                  height: normalize(70),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.RobotoRegular,
                  fontSize: normalize(16),
                  marginTop: normalize(10),
                }}>
                Thank You!
              </Text>
              <Text
                style={{
                  color: '#929292',
                  fontFamily: Fonts.RobotoRegular,
                  fontSize: normalize(11),
                  marginTop: normalize(10),
                  textAlign: 'center',
                  lineHeight: normalize(18),
                }}>
                A confirmation email has been sent to your inbox. Please follow
                instructions on email to complete your account set-up.
              </Text>
              <Text
                style={{
                  color: '#929292',
                  fontFamily: Fonts.RobotoRegular,
                  fontSize: normalize(10),
                  marginTop: normalize(30),
                  textAlign: 'center',
                }}>
                Didn't receive the email?
              </Text>
              <Text
                style={{
                  color: '#929292',
                  fontFamily: Fonts.RobotoRegular,
                  fontSize: normalize(10),
                  marginBottom: normalize(10),
                  textAlign: 'center',
                }}>
                Check your junk inbox or resend.
              </Text>

              <Button
                backgroundColor={Colors.yellow}
                // borderColor={Colors.white}
                title={'RESEND EMAIL'}
                titlesingle={true}
                marginTop={normalize(10)}
                marginBottom={normalize(20)}
                letterSpacing={2}
                textColor={Colors.black}
                fontSize={normalize(12)}
                fontFamily={Fonts.RobotoRegular}
                onPress={() => {
                  Resend();
                }}
              />
            </View>
          </Modal>
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
    alignItems: 'center',
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
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // width: '100%',
    marginVertical: normalize(10),
  },
  icon: {
    height: normalize(13),
    width: normalize(13),
    resizeMode: 'contain',
  },
  termsText: {
    // width: '88%',
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    color: Colors.white,
    alignSelf: 'flex-end',
    // marginLeft: normalize(10),
  },
  linkText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(11),
    color: Colors.yellow,
  },
});
