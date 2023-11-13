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
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {
  privacyPolicyRequest,
  slugRequest,
} from '../../redux/Reducer/HomeReducer';
import Loader from '../../utils/helpers/Loader';
import {useWindowDimensions} from 'react-native';
import SafeView from '../../components/SafeView';
const PrivacyPolicy = ({navigation}) => {
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  useEffect(() => {
    dispatch(privacyPolicyRequest());
    dispatch(slugRequest('contact_us'));
  }, []);
  const source = {
    html: HomeReducer?.slugData?.content,
  };
  const AccoridanData = [
    {
      id: 1,
      name: 'Information you share with us',
      select: false,
    },
    {
      id: 2,
      name: 'Information from PowaKaddy products and apps',
      select: false,
    },
    {
      id: 3,
      name: 'Cookies',
      select: false,
    },
    {
      id: 4,
      name: 'Email Communications',
      select: false,
    },
    {
      id: 5,
      name: 'Social Media',
      select: false,
    },
  ];

  const [open, setOpen] = useState([]);
  const [open1, setOpen1] = useState([]);
  // console.log('Open', open);
  // console.log('Open1', open1);

  useEffect(() => {
    if (HomeReducer?.status === 'Home/privacyPolicySuccess') {
      setOpen(HomeReducer?.privacypolicyData?.section1_faqs);
      setOpen1(HomeReducer?.privacypolicyData?.section2_faqs);
    }
  }, [HomeReducer?.status]);
  const handleClick = index1 => {
    const newItem = open.map((val, index) => {
      if (index == index1) {
        return {...val, isDeleted: !val.isDeleted};
      } else {
        return val;
      }
    });
    setOpen(newItem);
  };
  const handleClick1 = index1 => {
    const newItem = open1.map((val, index) => {
      if (index == index1) {
        return {...val, isDeleted: !val.isDeleted};
      } else {
        return val;
      }
    });
    setOpen1(newItem);
  };
  const {width} = useWindowDimensions();
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Loader
          visible={
            HomeReducer.status == 'Home/privacyPolicyRequest' ||
            HomeReducer.status == 'Home/slugRequest'
          }
        />
        <Header />
        <ScrollView style={{paddingHorizontal: 15}}>
          <Text style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
            Privacy Policy
          </Text>
          <View style={styles.separator} />
          <Text style={styles.firstHead}>
            {HomeReducer?.privacypolicyData?.header_heading}
          </Text>
          <Text style={styles.lightText}>
            {HomeReducer?.privacypolicyData?.header_description}
          </Text>
          <Text style={styles.firstHead}>
            {HomeReducer?.privacypolicyData?.section1_question}
          </Text>
          {open.length !== 0 && (
            <>
              {open.map((item, index) => (
                <View key={index} style={styles.accordianView}>
                  <TouchableOpacity
                    onPress={() => handleClick(index)}
                    style={styles.accordianHead}>
                    <View style={styles.row}>
                      <View style={styles.dot} />
                      <Text style={styles.accordianText}>{item?.question}</Text>
                    </View>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        transform: item.isDeleted
                          ? [{rotate: '270deg'}]
                          : [{rotate: '90deg'}],
                        marginTop: normalize(2),
                      }}
                      source={Icons.front}
                    />
                  </TouchableOpacity>
                  {item.isDeleted === true && (
                    <View style={{marginTop: 13}}>
                      <Text style={styles.lightText}>{item?.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
          <Text style={styles.firstHead}>
            {HomeReducer?.privacypolicyData?.section2_question}
          </Text>
          {open1.length !== 0 && (
            <>
              {open1.map((item, index) => (
                <View key={index} style={styles.accordianView}>
                  <TouchableOpacity
                    onPress={() => handleClick1(index)}
                    style={styles.accordianHead}>
                    <View style={styles.row}>
                      <View style={styles.dot} />
                      <Text style={styles.accordianText}>
                        {item.open == true
                          ? item?.question
                          : (item?.question).length > 40
                          ? (item?.question).substring(0, 40 - 3) + '...'
                          : item?.question}
                      </Text>
                    </View>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        transform: item.isDeleted
                          ? [{rotate: '270deg'}]
                          : [{rotate: '90deg'}],
                      }}
                      source={Icons.front}
                    />
                  </TouchableOpacity>
                  {item.isDeleted === true && (
                    <View style={{marginTop: 13}}>
                      <RenderHtml
                        contentWidth={'100%'}
                        source={{
                          html: item?.answer,
                        }}
                        baseStyle={{
                          fontSize: normalize(11),
                          color: Colors.white,
                          lineHeight: normalize(21),
                          fontFamily: Fonts.RobotoRegular,
                        }}
                        systemFonts={[Fonts.RobotoRegular]}
                      />
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
          <View style={styles.separator} />
          <Text style={styles.firstHead}>Changes to this privacy policy</Text>
          <Text style={styles.lightText}>
            {HomeReducer?.privacypolicyData?.footer_heading}
          </Text>
          <Text style={styles.lightText}>
            {HomeReducer?.privacypolicyData?.footer_description}
          </Text>
          {/* <Text style={styles.lightText}>
            We stand behind the commitments we have made. We will never change
            our policies and practices in a way that will offer less protection
            for personal information than we already have about you without your
            consent.
          </Text>
          <Text style={styles.lightText}>
            This privacy policy was last reviewed and updated in October 2020
            (PKPP-002)
          </Text> */}
          <View style={styles.separator} />
          <Text style={styles.firstHead}>Contact Us</Text>
          <RenderHtml
            contentWidth={width}
            source={source}
            baseStyle={{
              fontSize: normalize(11),
              color: Colors.lightGrey,
              lineHeight: normalize(21),
              fontFamily: Fonts.RobotoRegular,
            }}
            systemFonts={[Fonts.RobotoRegular]}
          />

          <Text style={styles.lightText}>
            If, after speaking to us, you are not satisfied with our response,
            you can contact the relevant regulator or authority in your country
            that is responsible for handling complaints about the use of
            personal information.
          </Text>
          <Text style={styles.lightText}>
            You can contact our Privacy Team at any time at
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:privacy@PowaKaddy.com')}>
              <Text
                style={{
                  color: Colors.primary,
                  textDecorationLine: 'underline',
                }}>
                {'\n'}privacy@PowaKaddy.com
              </Text>
            </TouchableOpacity>{' '}
            and we will get back to you as soon as possible.
          </Text>
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
  row: {flexDirection: 'row'},
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
  },
  accordianText: {
    fontSize: normalize(13),
    color: Colors.white,
    marginLeft: normalize(7),
    width: '80%',
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
  firstHead: {
    color: Colors.white,
    lineHeight: normalize(24),
    fontFamily: Fonts.RobotoBold,
    fontSize: normalize(14),
    marginBottom: normalize(6),
    marginTop: normalize(12),
  },
  lightText: {
    fontSize: normalize(11),
    color: Colors.lightGrey,
    marginBottom: normalize(12),
    lineHeight: normalize(21),
    fontFamily: Fonts.RobotoRegular,
  },
  accordianView: {
    marginVertical: normalize(14),
    paddingTop: normalize(20),
    borderTopWidth: 1,
    borderTopColor: Colors.greyDark,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: normalize(7),
  },
  accordianHead: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
});
export default PrivacyPolicy;
