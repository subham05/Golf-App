import React, {Fragment, useState} from 'react';
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
import Modal from 'react-native-modal';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Button from '../../components/Button';
import TextInputItem from '../../components/TextInputItem';
import {
  forgotpasswordRequest,
  loginRequest,
} from '../../redux/Reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import BigHeader from '../../components/BigHeader';

let status = '';

export default function ForgotPassword(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  function forgotfunction() {
    // onPress={()=>props.navigation.navigate('TabNavigator')}
    if (email == '') {
      showErrorAlert('Please enter your Email Id');
    } else if (!regex.test(email)) {
      showErrorAlert('Please enter correct Email Id');
    } else {
      let obj = {
        email: email.toLocaleLowerCase(),
      };
      connectionrequest()
        .then(() => {
          // console.log(obj);
          dispatch(forgotpasswordRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  if (status == '' || AuthReducer?.status !== status) {
    switch (AuthReducer?.status) {
      case 'Auth/forgotpasswordRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/forgotpasswordSuccess':
        status = AuthReducer?.status;
        setEmail('');
        setModal(true);
        setTimeout(() => {
          setModal(false);
        }, 3000);
        break;

      case 'Auth/forgotpasswordFailure':
        status = AuthReducer?.status;
        break;
    }
  }
  return (
    <>
      <SafeView color={Colors.black}>
        <MyStatusBar backgroundColor={Colors.black} />
        <Loader visible={AuthReducer.status == 'Auth/forgotpasswordRequest'} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={styles.parentview}>
            <BigHeader />
            <View>
              <Text style={styles.txtwelcome}>RESET PASSWORD</Text>
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
              <Text style={styles.textNew}>
                Enter the email associated with your existing account and we'll
                send and email with instructions to reset your password
              </Text>
              <Button
                backgroundColor={email != '' ? Colors.yellow : Colors.grey}
                title={'SEND'}
                marginTop={normalize(40)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => (email != '' ? forgotfunction() : null)}
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />
            </View>
          </ScrollView>
          <Modal
            // transparent={true}
            isVisible={modal}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            onBackButtonPress={() => setModal(false)}
            onBackdropPress={() => setModal(false)}
            animationType={'fade'}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
              alignSelf: 'center',
              paddingBottom: normalize(40),
              // backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: Colors.black,
                alignItems: 'center',

                paddingVertical: normalize(20),
                width: '90%',
                alignSelf: 'center',
                borderRadius: normalize(10),
                paddingHorizontal: normalize(15),
                // flex: 1,
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  fontFamily: Fonts.RobotoRegular,
                }}>
                An email has been sent to your registered account. Please check
                your inbox and junk folders to reset your password.
                {/* {AuthReducer.forgotpasswordResponse?.message} */}
              </Text>
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

    paddingBottom: normalize(30),
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
    fontSize: normalize(11),
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
    fontSize: normalize(11),
    fontFamily: Fonts.RobotoRegular,
  },
  bottomView: {
    marginVertical: normalize(30),

    alignItems: 'center',
  },
});
