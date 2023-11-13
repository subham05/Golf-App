import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Platform,
  } from 'react-native';
  import React, {useEffect} from 'react';
  import {Colors, Fonts, Icons} from '../../themes/ImagePath';
  import normalize from '../../utils/helpers/dimen';
  import MyStatusBar from '../../utils/MyStatusBar';
  import Header from '../../components/Header';
  import {useDispatch, useSelector} from 'react-redux';
  import {slugRequest} from '../../redux/Reducer/HomeReducer';
  import RenderHtml from 'react-native-render-html';
  import {useWindowDimensions} from 'react-native';
  import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
  
  const UserManual = ({navigation}) => {
    const dispatch = useDispatch();
    const HomeReducer = useSelector(state => state.HomeReducer);
    // console.log('HomeReducer',HomeReducer);
    useEffect(() => {
      dispatch(slugRequest('user_manual'));
    }, []);
    const source = {
      html: HomeReducer?.slugData?.content,
    };
    const {width} = useWindowDimensions();
    return (
      <>
        <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Loader visible={HomeReducer?.status == 'Home/slugRequest'} />
          <Header />
          <ScrollView style={{paddingHorizontal: 15}}>
            <Text style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
            User Manual
            </Text>
            <View style={styles.separator} />
            <RenderHtml
              contentWidth={width}
              source={source}
              baseStyle={{
                fontSize: normalize(11),
                marginTop: normalize(14),
                lineHeight: normalize(21),
                color: Colors.white,
                fontFamily: Fonts.RobotoRegular,
              }}
              systemFonts={[Fonts.RobotoRegular,Fonts.RobotoMedium]}
              tagsStyles={{h2 : {
                fontFamily:Fonts.RobotoMedium
              }}}
            />
          </ScrollView>
        </SafeView>
      </>
    );
  };
  const styles = StyleSheet.create({
    navBar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: StatusBar.currentHeight,
      padding: normalize(15),
    },
    back: {
      height: 18,
      width: 18,
      resizeMode: 'contain',
    },
    logo: {
      height: 31.4,
      width: 150,
      resizeMode: 'contain',
    },
    backBtn: {
      position: 'absolute',
      left: 0,
    },
    separator: {
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: Colors.greyDark,
      marginVertical: normalize(5),
    },
    title: {
      fontSize: Platform.OS == 'ios' ? normalize(13) : normalize(12),
      color: Colors.white,
      // fontWeight: 'bold',
      alignSelf: 'center',
      marginVertical: normalize(10),
      textTransform: 'uppercase',
      letterSpacing: 4,
    },
    para: {
      fontSize: normalize(14),
      color: Colors.white,
      lineHeight: normalize(24),
      marginTop: normalize(10),
      fontFamily: Fonts.RobotoRegular,
    },
    paraSub: {
      color: Colors.white,
      fontSize: normalize(14),
      marginTop: normalize(14),
    },
    link: {
      color: Colors.primary,
      fontSize: normalize(14),
      textDecorationLine: 'underline',
      marginTop: normalize(4),
    },
  });
  export default UserManual;
  