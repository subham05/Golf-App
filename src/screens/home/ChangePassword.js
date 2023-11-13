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
import {UpdatePasswordRequest} from '../../redux/Reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import BigHeader from '../../components/BigHeader';

let status = '';

export default function ChangePassword(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [newpassword, setNewpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [iconvisible, seticonvisible] = useState(true);
  const [iconvisible1, seticonvisible1] = useState(true);
  function Updatefunction() {
    // onPress={()=>props.navigation.navigate('TabNavigator')}
    if (newpassword == '') {
      showErrorAlert('Please enter New Password');
    } else if (confirmpassword == '') {
      showErrorAlert('Please enter Confirm Password');
    } else if (newpassword.length < 8 || confirmpassword.length < 8) {
      showErrorAlert('Please enter atleast 8 character password');
    } else if (newpassword != confirmpassword) {
      showErrorAlert('New password and Confirm Password does not match');
    } else {
      let obj = {
        password: newpassword,
        confirm_password: confirmpassword,
      };
      connectionrequest()
        .then(() => {
          // console.log(obj);
          dispatch(UpdatePasswordRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  if (status == '' || AuthReducer?.status !== status) {
    switch (AuthReducer?.status) {
      case 'Auth/UpdatePasswordRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/UpdatePasswordSuccess':
        status = AuthReducer?.status;
        setNewpassword('');
        setConfirmpassword('');
        break;

      case 'Auth/UpdatePasswordFailure':
        status = AuthReducer?.status;
        break;
    }
  }
  return (
    <>
      <SafeView color={Colors.black}>
        <MyStatusBar backgroundColor={Colors.black} />
        <Loader visible={AuthReducer.status == 'Auth/UpdatePasswordRequest'} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={styles.parentview}>
            <BigHeader />
            <View>
              <Text style={styles.txtwelcome}>Change Password</Text>
              <TextInputItem
                viewbordercolor="red"
                placeholder={'New Password'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={newpassword}
                onChangeText={val => setNewpassword(val)}
                textColor={Colors.white}
                isRightIconVisible={true}
                placeholderTextColor={'white'}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
                rightimage={iconvisible ? Icons.hide : Icons.Show}
                onrightimpress={() => seticonvisible(!iconvisible)}
                isSecure={iconvisible}
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Confirm New Password'}
                width={'100%'}
                borderRadius={normalize(6)}
                height={normalize(45)}
                borderWidth={1}
                value={confirmpassword}
                onChangeText={val => setConfirmpassword(val)}
                textColor={Colors.white}
                placeholderTextColor={'white'}
                isRightIconVisible={true}
                fontSize={normalize(11)}
                fontFamily={Fonts.RobotoLight}
                rightimage={iconvisible1 ? Icons.hide : Icons.Show}
                onrightimpress={() => seticonvisible1(!iconvisible1)}
                isSecure={iconvisible1}
              />

              <Button
                backgroundColor={
                  newpassword != '' || confirmpassword != ''
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
                  confirmpassword != '' || newpassword != ''
                    ? Updatefunction()
                    : null
                }
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />
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
