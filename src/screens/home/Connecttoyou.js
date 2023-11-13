import React, {Fragment, useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import _ from 'lodash';
import Button from '../../components/Button';
import {Colors, Icons, Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {BleContext} from '../../utils/helpers/BleBoundary';
import {useDispatch, useSelector} from 'react-redux';
import {SkipButtonPress} from '../../redux/Reducer/AuthReducer';
import {horizontalScale} from '../../utils/helpers/size';

export default function Connecttoyou(props) {
  const context = useContext(BleContext);
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  // Check Permission (Android & Ios)
  function checkPermission() {
    context.hasPermission(per => {
      // console.log('per', per);
      if (per) {
        // console.log('Permission : ', per);
        context.getCurrentLocation(position => {
          // console.log('Current Location : ', position);
          if (!_.isEmpty(position)) {
            // console.log('Current Location : ', position);
            if (GolfCourseReducer?.bleStatus) {
              props.navigation.navigate('Searching');
            } else if (Platform.OS == 'ios') {
              Linking.openURL('App-Prefs:Bluetooth');
              // console.log('Please turn on your bluetooth');
            } else {
              context.turnOnBluetooth(res => {
                if (res) {
                  props.navigation.navigate('Searching');
                } else {
                  // console.log('Failed');
                }
              });
            }
          }
        });
      }
    });
  }

  const [arr, setarr] = useState([
    {
      txt: 'Congratulations on your new GPS Trolley. To get the full experience from this app and your trolley you must connect your device.',
    },

    {
      txt: 'We will walk you through the process step by step.',
    },
    {
      txt: 'For compatible PowaKaddy trolleys open this app to automatically sync scorecard & stats for review after your round.',
    },
    {
      txt: 'Once you are connected you only need to repeat this process if you change your phone or delete this app.',
    },
  ]);

  function renderItem({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: normalize(10),
          width: '100%',
        }}>
        <View
          style={{
            width: normalize(1),
            height: '130%',
            backgroundColor:
              index == arr.length - 1 ? '#FFC211' : Colors.yellow,
            marginRight: normalize(10),
            marginLeft: normalize(4),
            marginTop: normalize(-10),
          }}></View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.roundview} />
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.RobotoRegular,
              fontSize: normalize(12),
              lineHeight: normalize(20),
              marginLeft: normalize(10),
            }}>
            {item?.txt}
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <>
      <MyStatusBar backgroundColor={Colors.black} />
      <View style={styles.parentview}>
        <View
          style={{
            width: '100%',
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {page == 2 && (
            <TouchableOpacity
              onPress={() => setPage(1)}
              style={styles.backbuttonview}>
              <View style={styles.innerBtn}>
                <Image source={Icons.downarrow} style={styles.backbutton} />
              </View>
            </TouchableOpacity>
          )}

          <Image source={Icons.logo} style={styles.logoview} />
        </View>
        <View style={styles.mainview}>
          {page == 1 ? (
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <Text style={styles.txtwelcome}>WELCOME</Text>
                <FlatList
                  data={arr}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View style={{marginBottom: normalize(40)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={styles.paginationline} />
                  <View style={styles.paginationround} />
                </View>
                <Button
                  backgroundColor={Colors.yellow}
                  title={'NEXT'}
                  marginTop={normalize(10)}
                  textColor={Colors.black}
                  titlesingle={true}
                  fontFamily={Fonts.RobotoMedium}
                  fontSize={normalize(16)}
                  fontWeight="500"
                  letterSpacing={2}
                  onPress={() => {
                    setPage(2);
                  }}
                />
              </View>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text style={styles.txthead}>connect to your PowaKaddy</Text>
                <Text style={styles.txtbody}>
                  {
                    'Before we start you need to make sure your trolley is powered on and you have the <<Pair>> setting active..'
                  }
                </Text>
                <Image source={Icons.connectbottom} style={styles.bodyimg} />
                <Text style={[styles.txtbody, {textAlign: 'center'}]}>
                  {'Settings - Trolley Settings - Bluetooth - Pair New Device '}
                </Text>
                <Text style={[styles.txtbody, {textAlign: 'center'}]}>
                  {'For older models follow:'}
                </Text>
                <Image source={Icons.connecttop} style={styles.bodyimg} />
                <Text style={[styles.txtbody, {textAlign: 'center'}]}>
                  {'Settings - Connectivity'}
                </Text>
              </View>
              <View
                style={{marginBottom: normalize(40), marginTop: normalize(30)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={styles.paginationround} />
                  <View style={styles.paginationline} />
                </View>
                <Button
                  backgroundColor={Colors.yellow}
                  title={'PAIR'}
                  marginTop={normalize(10)}
                  textColor={Colors.black}
                  titlesingle={true}
                  fontFamily={Fonts.RobotoMedium}
                  fontSize={normalize(16)}
                  fontWeight="500"
                  letterSpacing={2}
                  onPress={() => {
                    checkPermission()
                    dispatch(SkipButtonPress(false))
                  }}
                />
                <Button
                  backgroundColor={Colors.yellow}
                  title={'SKIP'}
                  marginTop={normalize(10)}
                  textColor={Colors.black}
                  titlesingle={true}
                  fontFamily={Fonts.RobotoMedium}
                  fontSize={normalize(16)}
                  fontWeight="500"
                  letterSpacing={2}
                  onPress={() => {
                    props.navigation.navigate('Home');
                    dispatch(SkipButtonPress(true));
                  }}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoview: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    marginTop: Platform.OS == 'ios' ? normalize(10) : normalize(30),
  },
  parentview: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
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
    fontSize: normalize(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    marginBottom: normalize(15),
  },
  paginationline: {
    width: normalize(16),
    height: normalize(4),
    backgroundColor: Colors.yellow,
    borderRadius: normalize(2),
  },
  paginationround: {
    width: normalize(4),
    height: normalize(4),
    borderRadius: normalize(2),
    backgroundColor: Colors.grey,
    marginHorizontal: normalize(8),
  },
  txtbody: {
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
    fontSize: normalize(12),
    lineHeight: normalize(20),
    marginTop: normalize(10),
    // marginLeft: normalize(10),
  },
  txthead: {
    color: Colors.white,
    fontSize: normalize(20),
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoBold,
    textTransform: 'uppercase',
    letterSpacing: normalize(1),
  },
  bodyimg: {
    width: normalize(200),
    height: normalize(120),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  backbuttonview: {
    position: 'absolute',
    left: normalize(15),

    height: normalize(35),
    width: normalize(35),

    justifyContent: 'center',
  },
  backbutton: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'stretch',

    transform: [{rotate: '90deg'}],
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
  innerBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,

    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
