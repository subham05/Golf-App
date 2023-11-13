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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {
  faqRequest,
  privacyPolicyRequest,
  slugRequest,
} from '../../redux/Reducer/HomeReducer';
import Loader from '../../utils/helpers/Loader';
import {useWindowDimensions} from 'react-native';
import SafeView from '../../components/SafeView';
const Faq = ({navigation}) => {
  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  useEffect(() => {
    dispatch(faqRequest());
  }, []);
  const source = {
    html: HomeReducer?.slugData?.content,
  };

  const [open, setOpen] = useState([]);
  // console.log('---', HomeReducer?.faqData);
  const faqArray = () => {
    let arr = [];
    for (let index = 0; index < HomeReducer?.faqData?.length; index++) {
      arr.push({
        answer: HomeReducer?.faqData[index]?.answer,
        question: HomeReducer?.faqData[index]?.question,
        open: false,
      });
    }
    setOpen(arr);
  };
  useEffect(() => {
    //
    if (HomeReducer?.status === 'Home/faqSuccess') {
      faqArray();
    }
  }, [HomeReducer?.status]);
  const handleClick = index1 => {
    const newItem = open.map((val, index) => {
      if (index == index1) {
        return {...val, open: !val.open};
      } else {
        return val;
      }
    });
    setOpen(newItem);
  };

  const {width} = useWindowDimensions();
  return (
    <SafeView style={{backgroundColor: Colors.bgColor, flex: 1}}>
      <MyStatusBar backgroundColor={Colors.bgColor} />
      <Loader
        visible={
          HomeReducer.status == 'Home/privacyPolicyRequest' ||
          HomeReducer.status == 'Home/slugRequest'
        }
      />
      <Header />
      <ScrollView style={{paddingHorizontal: 15}}>
        <Text style={styles.title}>Faq</Text>

        {open.length !== 0 && (
          <>
            {open.map((item, index) => (
              <View key={index} style={styles.accordianView}>
                <TouchableOpacity
                  onPress={() => handleClick(index)}
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
                      marginTop: normalize(2),
                      resizeMode: 'contain',
                      transform: item.open
                        ? [{rotate: '270deg'}]
                        : [{rotate: '90deg'}],
                    }}
                    source={Icons.front}
                  />
                </TouchableOpacity>
                {item.open === true && (
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
      </ScrollView>
    </SafeView>
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
    fontFamily: Fonts.RobotoRegular,
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
    width: '90%',
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
    fontSize: normalize(13),
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
export default Faq;
