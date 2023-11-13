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
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Button from '../../components/Button';
import TextInputItem from '../../components/TextInputItem';
import {loginRequest} from '../../redux/Reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';

let status = '';
export default function Signin(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [iconvisible, seticonvisible] = useState(true);
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function signinfunction() {
    // onPress={()=>props.navigation.navigate('TabNavigator')}
    if (email == '') {
      showErrorAlert('Please enter your Email Id');
    } else if (!regex.test(email)) {
      showErrorAlert('Please enter correct Email Id');
    } else if (password == '') {
      showErrorAlert('Please enter password');
    } else if (password.length < 8) {
      showErrorAlert('Please enter atleast 8 character password');
    } else {
      let obj = {
        email: email.toLocaleLowerCase(),
        password: password,
        device_token: '666',
        device_type: Platform.OS,
      };
      connectionrequest()
        .then(() => {
          // console.log(obj);
          dispatch(loginRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  if (status == '' || AuthReducer?.status !== status) {
    switch (AuthReducer?.status) {
      case 'Auth/loginRequest':
        status = AuthReducer?.status;
        break;

      case 'Auth/loginSuccess':
        status = AuthReducer?.status;
        props.navigation.replace('Connecttoyou');
        break;

      case 'Auth/loginFailure':
        status = AuthReducer?.status;
        break;
    }
  }

  return (
    <>
      <SafeView color={Colors.black}>
        <MyStatusBar backgroundColor={Colors.black} />
        <Loader visible={AuthReducer.status == 'Auth/loginRequest'} />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={styles.parentview}>
            <View
              style={{
                width: '100%',
                height: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={Icons.logo} style={styles.logoview} />
            </View>
            <View>
              <Text style={styles.txtwelcome}>SIGN IN</Text>
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
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => props.navigation.navigate('ForgotPassword')}>
                <Text style={styles.secondarybtnText}>Forgot password?</Text>
              </TouchableOpacity>
              <Button
                backgroundColor={Colors.yellow}
                title={'SIGN IN'}
                marginTop={normalize(10)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => signinfunction()}
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(16),
                  // alignItems: 'center',
                  // flexWrap:"wrap",
                  // backgroundColor:'red'
                }}>
                <Text style={styles.aggrementText}>
                  By signing in, you agree to
                </Text>
                <TouchableOpacity
                  style={{
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop:normalize(17)
                  }}>
                  <Text style={styles.aggrementText1}>
                    {' '}
                    Powakaddy Terms of Use{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:normalize(5)
              }}>
              <Text style={styles.aggrementText}>and</Text>
              <TouchableOpacity>
              <Text style={[styles.aggrementText,{color:Colors.yellow}]}>
                license agreements
              </Text>
              </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.textNew}>New to PowaKaddy?</Text>
              <Button
                backgroundColor={Colors.yellow}
                title={'CREATE AN ACCOUNT'}
                marginTop={normalize(10)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => props.navigation.navigate('Signup')}
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
    width: '60%',
    height: '50%',
    marginBottom: normalize(20),
    resizeMode: 'contain',
    marginTop: Platform.OS == 'ios' ? normalize(60) : normalize(30),
  },
  parentview: {
    flexGrow: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: normalize(16),
    justifyContent: 'space-between',
    paddingBottom: normalize(10),
  },
  mainview: {
    backgroundColor: Colors.black,
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
    fontSize: normalize(11),
    fontFamily: Fonts.RobotoRegular,
  },
  aggrementText: {
    color: Colors.white,
    fontSize: normalize(11),
    fontFamily: Fonts.RobotoRegular,
    // marginTop: normalize(16),
    paddingLeft: normalize(4),
  },
  aggrementText1: {
    color: Colors.yellow,
    fontSize: normalize(11),
    fontFamily: Fonts.RobotoRegular,
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
