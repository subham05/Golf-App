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
import {
  forgotpasswordRequest,
  loginRequest,
} from '../../redux/Reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import {horizontalScale} from '../../utils/helpers/size';
import BigHeader from '../../components/BigHeader';

let status = '';

export default function ChangeLoginDetails(props) {
  const AuthReducer = useSelector(state => state.AuthReducer);
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
              <Text style={styles.txtwelcome}>Change Log In Details</Text>

              <Button
                backgroundColor={Colors.yellow}
                title={'EMAIL'}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => props.navigation.navigate('ChangeEmail')}
                //   isightsideImage={true}
                //   rightimg={Icons.downarrow}
              />
              <Button
                backgroundColor={Colors.yellow}
                title={'PASSWORD'}
                marginTop={normalize(15)}
                textColor={Colors.black}
                titlesingle={true}
                fontFamily={Fonts.RobotoRegular}
                fontSize={normalize(12)}
                letterSpacing={2}
                onPress={() => props.navigation.navigate('ChangePassword')}
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
    marginBottom: normalize(14),
    marginTop: normalize(40),
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
  innerBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
