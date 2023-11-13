import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Linking,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {technicalSupportRequest} from '../../redux/Reducer/HomeReducer';
import SafeView from '../../components/SafeView';
const TechnicalSupport = ({navigation}) => {
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  useEffect(() => {
    dispatch(technicalSupportRequest());
  }, []);
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <ScrollView
          style={{paddingHorizontal: 15}}
          contentContainerStyle={{paddingBottom: 30}}>
          <Text style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
            technical support
          </Text>
          <View style={styles.separator} />
          <Text style={styles.para}>
            {HomeReducer?.technicalSupportData?.header_heading}
          </Text>
          <Text style={styles.paraSub}>
            {HomeReducer?.technicalSupportData?.header_description}
          </Text>
          <View style={styles.separator} />
          <View style={styles.contain}>
            <View style={styles.moreContact}>
              <View
                style={{
                  height: '100%',
                  // borderWidth:1,
                  // borderColor:Colors.white
                }}>
                <Image
                  style={{
                    height: normalize(16),
                    width: normalize(14),
                    resizeMode: 'contain',
                    // borderWidth: 1,
                    // borderColor:'white'
                  }}
                  source={Icons.location1}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  // backgroundColor:'red',
                  width:'95%'
                  // borderWidth: 1,
                  // borderColor:Colors.white
                }}>
                <Text style={styles.moreText}>
                  {HomeReducer?.technicalSupportData?.address}
                </Text>
              </View>
            </View>
            {/* <View style={[styles.moreContact,{alignItems:'center'}]}>
              <View
                style={{
                  height: '100%',
                  // borderWidth:1,
                  // borderColor:Colors.white,
                }}>
                <Image
                  style={{height: 21, width: 23, resizeMode: 'contain',marginTop:normalize(3)}}
                  source={Icons.phone}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  // borderWidth:1,
                  // borderColor:Colors.white,
                  
                }}>
                <Text style={[styles.moreText,{marginLeft:normalize(6), marginTop:0}]}>
                  {HomeReducer?.technicalSupportData?.phone}
                </Text>
              </View>
            </View> */}
            <View
              style={{
                // borderWidth: 1,
                // borderColor: Colors.white,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: normalize(18),
              }}>
              <Image
                style={{
                  height: normalize(18),
                  width: normalize(18),
                  resizeMode: 'contain',
                  // marginTop: normalize(3),
                }}
                source={Icons.phone}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.RobotoRegular,
                  fontSize: normalize(12),
                  marginLeft: normalize(8),
                  marginTop: normalize(-3),
                }}>
                {HomeReducer?.technicalSupportData?.phone}
              </Text>
            </View>
            <View style={styles.moreContact}>
              <View
                style={{
                  height: '100%',
                  // borderWidth:1,
                  // borderColor:Colors.white
                }}>
                <Image
                  style={{height: 16, width: 23, resizeMode: 'contain'}}
                  source={Icons.calender}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  // borderWidth:1,
                  // borderColor:Colors.white
                }}>
                <Text
                  style={[
                    styles.moreText,
                    {marginLeft: normalize(6), marginTop: normalize(-7)},
                  ]}>
                  {HomeReducer?.technicalSupportData?.timing}
                </Text>
                <Text style={styles.subText}>
                  {'( Excluding bank holidays )'}
                </Text>
              </View>
            </View>
            <View style={styles.moreContact}>
              <View
                style={{
                  height: '100%',
                }}>
                <Image
                  style={{height: 14, width: 23, resizeMode: 'contain'}}
                  source={Icons.mail}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `mailto:${HomeReducer?.technicalSupportData?.email}`,
                  )
                }
                style={{
                  height: '100%',
                }}>
                <Text style={styles.moreTextLink}>
                  {' '}
                  {HomeReducer?.technicalSupportData?.email}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
          <View
            style={{
              marginTop: normalize(15),
            }}>
            {/* <Image
            style={{height: 14, width: 23, resizeMode: 'contain'}}
            source={Icons.mail}
          /> */}
            <Text
              style={[
                styles.moreText,
                {
                  marginLeft: 0,
                  fontSize: 16,
                  lineHeight: 28,
                  marginBottom: normalize(8),
                },
              ]}>
              {HomeReducer?.technicalSupportData?.footer_description}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(HomeReducer?.technicalSupportData?.footer_link);
              }}>
              <Text
                style={[styles.moreTextLink, {marginLeft: 0, fontSize: 15}]}>
                {HomeReducer?.technicalSupportData?.footer_link}
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: normalize(13),
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
    fontFamily: Fonts.RobotoMedium,
  },
  subText: {
    fontSize: normalize(12),
    color: Colors.lightGrey,
    // fontFamily:Fonts.RobotoRegular,
    fontStyle: 'italic',
    marginLeft: normalize(6),
    marginTop: normalize(4),
  },
  paraSub: {
    fontSize: normalize(12),
    color: Colors.white,
    lineHeight: normalize(24),
    marginTop: normalize(10),
    marginBottom: normalize(15),
    fontFamily: Fonts.RobotoRegular,
  },

  moreContact: {
    marginTop: normalize(20),
    flexDirection: 'row',
    // alignItems: 'center',
  },
  moreText: {
    color: Colors.white,
    fontSize: normalize(12),
    lineHeight: normalize(24),
    marginLeft: normalize(10),
    marginTop: normalize(-8),
    fontFamily: Fonts.RobotoRegular,
  },
  moreTextLink: {
    color: Colors.primary,
    fontSize: normalize(12),
    lineHeight: normalize(24),
    marginLeft: normalize(6),
    marginTop: Platform.OS == 'ios' ? normalize(-6) : normalize(-11),
    textDecorationLine: 'underline',
    fontFamily: Fonts.RobotoRegular,
  },
  contain: {marginBottom: normalize(28)},
});
export default TechnicalSupport;
