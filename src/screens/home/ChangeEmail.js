import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Button from '../../components/Button';
import TextInputItem from '../../components/TextInputItem';
import {
  UpdateEmailRequest,
  UserDetailRequest,
} from '../../redux/Reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import Modal from 'react-native-modal';
import {horizontalScale} from '../../utils/helpers/size';
import BigHeader from '../../components/BigHeader';

let status = '';

export default function ChangeEmail(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [newemail, setNewemail] = useState('');
  const [confirmemail, setConfirmemail] = useState('');
  const [modalview, setmodal] = useState(false);

  function Updatefunction() {
    // onPress={()=>props.navigation.navigate('TabNavigator')}
    if (newemail == '') {
      showErrorAlert('Please enter New Email id');
    } else if (!regex.test(newemail)) {
      showErrorAlert('Please enter Valid Email id');
    } else if (confirmemail == '') {
      showErrorAlert('Please enter Confirm Email id');
    } else if (!regex.test(confirmemail)) {
      showErrorAlert('Please enter Valid Email id');
    } else if (newemail != confirmemail) {
      showErrorAlert('New email and Confirm email does not match');
    } else {
      let obj = {
        email: newemail,
        confirm_email: confirmemail,
      };
      connectionrequest()
        .then(() => {
          // console.log(obj);
          dispatch(UpdateEmailRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  if (status == '' || AuthReducer?.status !== status) {
    switch (AuthReducer?.status) {
      case 'Auth/UpdateEmailRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/UpdateEmailSuccess':
        status = AuthReducer?.status;
        setNewemail('');
        setConfirmemail('');
        setmodal(true);
        dispatch(UserDetailRequest());
        break;

      case 'Auth/UpdateEmailFailure':
        status = AuthReducer?.status;
        break;
    }
  }
  return (
    <>
      <SafeView color={Colors.black}>
        <MyStatusBar backgroundColor={Colors.black} />
        <Loader visible={AuthReducer.status == 'Auth/UpdateEmailRequest'} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={styles.parentview}>
            <BigHeader />
            <View>
              <Text style={styles.txtwelcome}>Change Email</Text>
              <TextInputItem
                viewbordercolor="red"
                placeholder={'New Email'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={newemail}
                onChangeText={val => setNewemail(val)}
                textColor={Colors.white}
                isRightIconVisible={false}
                placeholderTextColor={'white'}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Confirm New Email'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={confirmemail}
                onChangeText={val => setConfirmemail(val)}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={false}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
              />

              <Button
                backgroundColor={
                  newemail != '' || confirmemail != ''
                    ? Colors.yellow
                    : Colors.grey
                }
                title={'SAVE'}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() =>
                  confirmemail != '' || newemail != '' ? Updatefunction() : null
                }
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />
            </View>
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
                  onPress={() => setmodal(false)}>
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
                  A confirmation email has been sent to your inbox. Please
                  check.
                </Text>

                <Button
                  backgroundColor={Colors.yellow}
                  // borderColor={Colors.white}
                  title={'OKAY'}
                  titlesingle={true}
                  marginTop={normalize(10)}
                  marginBottom={normalize(20)}
                  letterSpacing={2}
                  textColor={Colors.black}
                  fontSize={normalize(12)}
                  fontFamily={Fonts.RobotoRegular}
                  onPress={() => {
                    setmodal(false);
                  }}
                />
              </View>
            </Modal>
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
    fontSize: normalize(13),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    marginTop: normalize(40),
    marginBottom: normalize(14),
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
