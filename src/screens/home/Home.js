import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import Realm from 'realm';
import {useIsFocused} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Header from '../../components/Header';
import {horizontalScale, verticalScale} from '../../utils/helpers/size';
import {
  GuestMemberLoginRequest,
  devicefirmwareVersionDetailsRequest,
} from '../../redux/Reducer/GolfCourseReducer';
import {UserDetailRequest} from '../../redux/Reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {BleContext} from '../../utils/helpers/BleBoundary';

let status = '';

let realm = new Realm({path: 'Powakaddy.realm'});
// create a component
const Rounds = ({navigation, route}) => {
  const context = useContext(BleContext);
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const {width} = Dimensions.get('window');
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [connect, setConnect] = useState(false);
  const ref = useRef(null);
  const isFocused = useIsFocused();
  const [DBstatus, setDBstatus] = useState(false);
  const [getUserData, setUSerData] = useState({});
  const [check, setCheck] = useState(false);

  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));
  console.log('deviceObj', deviceObj);

  const updateCurrent = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(activeIndex);
    // console.log('activeIndex', activeIndex);
  };

  var devices = realm.objects('bluetooth_devices');
  useEffect(() => {
    // console.log('Devices_details', devices);
    connectionrequest()
      .then(() => {
        // console.log(obj);
        dispatch(UserDetailRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });

    console.log('----periferal', deviceObj[0]?.deviceID);
  }, []);

  function onRealmChange() {
    setTimeout(() => {
      // getDeviceAllStatus(global.Allproducts);
      console.log('Changes are done');
      if (devices?.length !== 0) {
        if (devices[0].status == false) {
          setDBstatus(false);
        } else {
          setDBstatus(true);
        }
      }
    }, 1000);
  }

  useEffect(() => {
    if (devices?.length !== 0) {
      if (devices[0].status == false) {
        setDBstatus(false);
      } else {
        setDBstatus(true);
      }
    }
  }, [isFocused]);

  // LISTEN ANY DISCONNECTED DEVICE
  useEffect(() => {
    if (isFocused) {
      try {
        realm.addListener('change', onRealmChange);
      } catch (error) {
        console.error(
          `An exception was thrown within the change listener: ${error}`,
        );
      }
      return () => {
        realm.removeListener('change', onRealmChange);
      };
    }
  }, [isFocused]);

  useEffect(() => {
    let obj = {
      id_product: 233,
      firmwareVersion: deviceObj[0]?.deviceVersion,
    };
    connectionrequest()
      .then(() => {
        // console.log(obj);
        dispatch(devicefirmwareVersionDetailsRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect To Internet');
      });
  }, []);

  const checkingVerison = () => {
    let _currentVersion = deviceObj[0]?.deviceVersion?.replace(/\./g, '');
    let _latestVersion =
      GolfCourseReducer?.devicefirmwareVersionRes?.firmwareVersion?.replace(
        /\./g,
        '',
      );

    if (_currentVersion < _latestVersion) {
      setCheck(true);
    } else if (_currentVersion >= _latestVersion) {
      setCheck(false);
    }
  };

  if (status == '' || GolfCourseReducer?.status !== status) {
    switch (GolfCourseReducer?.status) {
      case 'GolfCourse/devicefirmwareVersionDetailsRequest':
        status = GolfCourseReducer?.status;
        break;

      case 'GolfCourse/devicefirmwareVersionDetailsSuccess':
        status = GolfCourseReducer?.status;
        checkingVerison();
        break;

      case 'GolfCourse/devicefirmwareVersionDetailsFailure':
        status = GolfCourseReducer?.status;
        showErrorAlert('Something went wrong');
        // setVServer()
        break;
    }
  }

  // useEffect(() => {
  //   let obj = realm.objects('bluetooth_devices');
  //   console.log('----', obj[0]?.status);
  //   if (obj[0]?.status == true) {
  //     dispatch(isPeriferalConnected(true));
  //   } else {
  //     dispatch(isPeriferalConnected(false));
  //   }
  // }, []);

  const CardView = () => {
    return (
      <View style={styles.slideWrapper}>
        <View style={styles.cardView}>
          {connect && (
            <Text
              style={[
                styles.park,
                {
                  alignSelf: 'flex-start',
                  fontFamily: Fonts.RobotoMedium,
                },
              ]}>
              Fairways Hit
            </Text>
          )}
          {connect && (
            <View style={styles.borderedView}>
              <View style={styles.percentView}>
                <Image
                  source={Icons.back}
                  style={[styles.rotatedBack, {transform: [{rotate: '50deg'}]}]}
                />
                <Text
                  style={[
                    styles.key,
                    {fontSize: normalize(13), fontFamily: Fonts.RobotoMedium},
                  ]}>
                  15%
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.line,
                }}
              />
              <View style={styles.percentView}>
                <Image
                  source={Icons.back}
                  style={[styles.rotatedBack, {transform: [{rotate: '90deg'}]}]}
                />
                <Text
                  style={[
                    styles.key,
                    {fontSize: normalize(13), fontFamily: Fonts.RobotoMedium},
                  ]}>
                  70%
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.line,
                }}
              />
              <View style={styles.percentView}>
                <Image
                  source={Icons.back}
                  style={[
                    styles.rotatedBack,
                    {transform: [{rotate: '125deg'}]},
                  ]}
                />
                <Text
                  style={[
                    styles.key,
                    {fontSize: normalize(13), fontFamily: Fonts.RobotoMedium},
                  ]}>
                  15%
                </Text>
              </View>
            </View>
          )}
          <Text
            style={[
              styles.park,
              {alignSelf: 'flex-start', fontFamily: Fonts.RobotoMedium},
            ]}>
            Average Greens in Regulations ( GIR )
          </Text>
          <Text
            style={[
              styles.cardName,
              {
                alignSelf: 'flex-start',
                marginVertical: normalize(5),
                fontFamily: Fonts.RobotoMedium,
              },
            ]}>
            30%
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Loader
          visible={
            GolfCourseReducer.status ==
              'GolfCourse/devicefirmwareVersionDetailsRequest' ||
            AuthReducer?.status == 'Auth/UserDetailRequest'
          }
        />
        {AuthReducer?.isSkip ? (
          <View style={{backgroundColor: Colors.bgColor}}>
            <View style={styles.navBar}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Connecttoyou')}
                style={styles.backBtn}>
                <View style={styles.innerBtn}>
                  <Image source={Icons.LeftArrow} style={styles.back} />
                </View>
              </TouchableOpacity>
              <Image source={Icons.logo} style={styles.logo} />
              {/* <View
                style={{
                  height: horizontalScale(20),
                  width: horizontalScale(20),
                }}></View> */}
              <TouchableOpacity
                style={{
                  height: normalize(50),
                  width: normalize(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: normalize(-15),
                }}
                onPress={() => navigation.navigate('MyAccount')}>
                <Image
                  source={Icons.UserLogo}
                  style={{
                    resizeMode: 'contain',
                    height: horizontalScale(20),
                    width: horizontalScale(20),
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '90%',
                height: 1,
                backgroundColor: Colors.line,
                alignSelf: 'center',
                marginTop: horizontalScale(10),
                marginBottom: verticalScale(3),
              }}></View>
          </View>
        ) : (
          <View style={styles.navBar1}>
            <View style={styles.backBtn1}></View>
            <Image source={Icons.logo} style={styles.logo} />
            <TouchableOpacity
              style={{marginTop: normalize(-10)}}
              onPress={() => navigation.navigate('MyAccount')}>
              <Image
                source={Icons.UserLogo}
                style={{
                  resizeMode: 'contain',
                  height: horizontalScale(20),
                  width: horizontalScale(20),
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* <View style={styles.navBar}>
          <Image source={Icons.logo} style={styles.logo} />
        </View> */}
        <ScrollView
          // style={styles.mainView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: normalize(5)}}>
          <View style={styles.mainRow}>
            <View
              style={[
                styles.statusView,
                {
                  backgroundColor: DBstatus ? Colors.green : Colors.red,
                  height: normalize(40),
                  paddingVertical: 0,
                },
              ]}>
              <Text
                style={[
                  styles.connected,
                  {
                    fontSize: normalize(10),
                    fontFamily: Fonts.RobotoMedium,
                  },
                ]}>
                {DBstatus ? 'Connected' : 'Disconnected'}
              </Text>
              {DBstatus && check && (
                <TouchableOpacity
                  style={[styles.innerRow, {marginLeft: normalize(8)}]}
                  onPress={() => navigation.navigate('Newfirmwireupdate')}>
                  <View style={styles.circle}>
                    <Text
                      style={[
                        styles.connected,
                        {fontFamily: Fonts.RobotoMedium},
                      ]}>
                      !
                    </Text>
                  </View>
                  <Text
                    style={[styles.update, {fontFamily: Fonts.RobotoMedium}]}>
                    Update Available...
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={[
                styles.batteryView,
                {height: normalize(40), paddingVertical: 0},
              ]}>
              <Image
                source={DBstatus ? Icons.battery : Icons.batterygrey}
                style={[
                  styles.battery,
                  {height: normalize(10), resizeMode: 'stretch'},
                ]}
              />
            </View>
          </View>

          {DBstatus ? (
            <View>
              {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
                <View></View>
              ) : (
                <Text
                  style={[
                    styles.cardName,
                    {
                      alignSelf: 'flex-start',
                      marginHorizontal: normalize(15),
                      marginTop: normalize(12),
                      fontFamily: Fonts.RobotoBold,
                    },
                  ]}>
                  Player Stats
                </Text>
              )}
              {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
                <View></View>
              ) : (
                <FlatList
                  ref={ref}
                  nestedScrollEnabled={true}
                  horizontal={true}
                  data={[1, 1]}
                  pagingEnabled={true}
                  onMomentumScrollEnd={updateCurrent}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => item.id}
                  contentContainerStyle={{}}
                  renderItem={({item, index}) => <CardView />}
                />
              )}
              {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
                <View></View>
              ) : (
                <View style={styles.dotRow}>
                  {[1, 1].map((item, index) => (
                    <View
                      style={[
                        styles.activeDot,
                        {
                          backgroundColor:
                            currentIndex == index ? Colors.yellow : '#7B7878',
                        },
                      ]}
                    />
                  ))}
                </View>
              )}
              {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
                <View></View>
              ) : (
                <Animatable.View
                  animation={'fadeInUp'}
                  duration={800}
                  style={styles.scoreCard}>
                  <View style={styles.cardRow}>
                    <Text
                      style={[
                        styles.cardName,
                        {fontFamily: Fonts.RobotoMedium},
                      ]}>
                      Latest Round Summary
                    </Text>
                  </View>
                  <View style={[styles.separator, {width: '100%'}]} />
                  <View>
                    <Text
                      style={[styles.park, {fontFamily: Fonts.RobotoMedium}]}>
                      Yurassic park
                    </Text>
                    <View style={styles.cardRow}>
                      <View style={styles.innerRow}>
                        <Image source={Icons.flag} style={styles.calendar} />
                        <Text
                          style={[
                            styles.date,
                            {fontFamily: Fonts.RobotoRegular},
                          ]}>
                          Kharkiv, Kharkivs’ka oblast, 0.3 miles
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.separator, {width: '100%'}]} />
                    <View style={[styles.cardRow, {width: '70%'}]}>
                      <View style={styles.innerRow}>
                        <Image
                          source={Icons.calendar}
                          style={[styles.calendar, {marginRight: 10}]}
                        />
                        <Text
                          style={[
                            styles.date,
                            {fontFamily: Fonts.RobotoRegular},
                          ]}>
                          07 Dec 2022
                        </Text>
                      </View>
                      <View
                        style={[styles.innerRow, {marginLeft: normalize(20)}]}>
                        <Image
                          source={Icons.clock}
                          style={[styles.calendar, {marginRight: 10}]}
                        />
                        <Text
                          style={[
                            styles.date,
                            {fontFamily: Fonts.RobotoRegular},
                          ]}>
                          8:45am
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.separator, {width: '100%'}]} />
                  <View style={styles.scoreRow}>
                    <View style={styles.innerRow}>
                      <Text
                        style={[styles.key, {fontFamily: Fonts.RobotoRegular}]}>
                        Gross score :
                      </Text>
                      <Text style={styles.value}> 10</Text>
                    </View>
                    <View style={styles.innerRow}>
                      <Text
                        style={[styles.key, {fontFamily: Fonts.RobotoRegular}]}>
                        Net score :
                      </Text>
                      <Text style={styles.value}> 5</Text>
                    </View>
                    <View style={styles.innerRow}>
                      <Text
                        style={[styles.key, {fontFamily: Fonts.RobotoRegular}]}>
                        Points :
                      </Text>
                      <Text style={styles.value}> 5</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ScoreCards');
                    }}
                    style={styles.button}>
                    <Text
                      style={[
                        styles.buttonTxt,
                        {
                          fontFamily: Fonts.RobotoMedium,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                        },
                      ]}>
                      View Scorecard
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate('CourseSearch')}
            style={[styles.button, {width: '95%'}]}>
            <View style={styles.innerRow}>
              <Image source={Icons.flag} style={styles.flag} />
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    fontFamily: Fonts.RobotoMedium,
                    letterSpacing: 2,
                    marginTop: 2,
                  },
                ]}>
                COURSES
              </Text>
            </View>
          </TouchableOpacity>
          {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
            <View></View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Rounds');
              }}
              style={[styles.button, {width: '95%'}]}>
              <View style={styles.innerRow}>
                <Image source={Icons.board} style={[styles.board]} />
                <Text
                  style={[
                    styles.buttonTxt,
                    {
                      fontFamily: Fonts.RobotoMedium,
                      letterSpacing: 2,
                      marginTop: 2,
                      marginLeft: 2,
                    },
                  ]}>
                  ROUNDS
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('MyAccount')}
            style={[styles.button, {width: '95%'}]}>
            <View style={styles.innerRow}>
              <Image source={Icons.UserAccount} style={styles.account} />
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    fontFamily: Fonts.RobotoMedium,
                    letterSpacing: 2,
                    marginTop: 2,
                  },
                ]}>
                ACCOUNT
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SupportScreen')}
            style={[
              styles.button,
              {width: '95%', marginBottom: normalize(20)},
            ]}>
            <View style={styles.innerRow}>
              <Image source={Icons.headphoneNew} style={styles.headPhone} />
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    fontFamily: Fonts.RobotoMedium,
                    letterSpacing: 2,
                    marginTop: 2,
                  },
                ]}>
                SUPPORT
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('EditClub')}
            style={[
              styles.button,
              {width: '95%', marginBottom: normalize(20)},
            ]}>
            <View style={styles.innerRow}>
              <Image source={Icons.headphoneNew} style={styles.headPhone} />
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    fontFamily: Fonts.RobotoMedium,
                    letterSpacing: 2,
                    marginTop: 2,
                  },
                ]}>
                Virtual Bag
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('Rounds');
            }}
            style={[styles.button, {width: '95%'}]}>
            <View style={styles.innerRow}>
              <Image source={Icons.board} style={[styles.board]} />
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    fontFamily: Fonts.RobotoMedium,
                    letterSpacing: 2,
                    marginTop: 2,
                    marginLeft: 2,
                  },
                ]}>
                ROUNDS
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() =>
              showErrorAlert(
                'This account is Inactive. Please contact with the admin.',
              )
            }
            style={[
              styles.button,
              {width: '95%', marginBottom: normalize(20)},
            ]}>
            <View style={styles.innerRow}>
              <Image source={Icons.headphoneNew} style={styles.headPhone} />
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    fontFamily: Fonts.RobotoMedium,
                    letterSpacing: 2,
                    marginTop: 2,
                  },
                ]}>
                SUPPORT
              </Text>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  navBar1: {
    // height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? normalize(20) : normalize(10),
    paddingBottom: normalize(20),
    justifyContent: 'space-between',
  },
  mainView: {
    flex: 1,
  },
  logo: {
    height: 31.4,
    width: normalize(150),
    resizeMode: 'contain',
  },

  separator: {
    width: '90%',
    borderTopWidth: 1,
    borderTopColor: '#282727', //Colors.white,
    // borderTopColor: Colors.black2,
    marginVertical: 5,
    alignSelf: 'center',
  },
  mainRow: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statusView: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  percentRow: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  button: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: normalize(8),
  },
  inactiveDot: {
    height: 8,
    width: 8,
    borderRadius: 10,
    backgroundColor: Colors.inactiveDot,
    marginRight: 5,
  },
  activeDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#7B7878',
    marginRight: 5,
  },
  buttonTxt: {color: Colors.black, fontSize: 15, fontWeight: '600'},
  connected: {
    color: Colors.white,
    fontSize: 11,
    // fontWeight: '500',
  },
  update: {color: Colors.white, fontSize: 12, fontWeight: '500'},
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  batteryView: {
    width: '19%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.black2,
    paddingVertical: 25,
  },
  battery: {
    height: 12.63,
    width: 24,
    resizeMode: 'contain',
  },
  cardView: {
    width: Dimensions.get('window').width - normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
    marginTop: 10,
    backgroundColor: Colors.black2,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cardName: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  percentage: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
  },
  key: {
    color: Colors.white,
    fontSize: normalize(9),
    fontWeight: '400',
    alignSelf: 'center',
  },
  value: {
    color: Colors.primary,
    fontSize: normalize(9),
    fontWeight: '400',
    fontFamily: Fonts.RobotoRegular,
    marginTop: 2,
  },
  arc: {
    height: 130,
    width: 260,
    resizeMode: 'cover',
    marginTop: 10,
  },
  cardRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  back: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginRight: 5,
  },
  rotatedBack: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  cardRow: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    borderColor: Colors.white,
    marginVertical: 10,
  },
  cardName: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '500',
  },
  scoreCard: {
    borderWidth: 1,
    borderRadius: 13,
    width: '95%',
    justifyContent: 'center',
    alignItem: 'center',
    borderColor: Colors.yellow,
    padding: 18,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: normalize(17),
  },
  cardRow: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    borderColor: Colors.white,
    marginVertical: 10,
  },
  cardName: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '500',
  },
  calendar: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  flag: {
    height: 26,
    width: 18,
    resizeMode: 'contain',
    tintColor: Colors.black,
    marginRight: 10,
    marginLeft: 2,
  },
  account: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    tintColor: Colors.black,
    marginRight: 8,
    marginLeft: Platform.OS == 'android' ? 2 : 0,
  },
  board: {
    height: 22,
    width: 18,
    resizeMode: 'contain',
    tintColor: Colors.black,
    marginRight: 10,
    marginLeft: -8,
  },
  headPhone: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
    // tintColor: Colors.black,
    marginRight: 10,
    marginLeft: 2,
  },
  date: {
    fontSize: 13,
    color: Colors.white,
    marginLeft: 5,
  },
  park: {
    fontSize: normalize(11),
    color: Colors.primary,
    // fontWeight: 'bold',
    marginTop: normalize(8),
  },
  scoreRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItem: 'center',
    marginVertical: 10,
  },
  percentView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(10),
  },
  borderedView: {
    width: '98%',
    borderRadius: normalize(13),
    borderWidth: 1,
    borderColor: Colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(22),
    marginVertical: 10,
  },
  slideWrapper: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',

    marginTop: Platform.OS == 'ios' ? 0 : normalize(15),
    height: normalize(70),
  },
  back: {
    height: horizontalScale(10),
    width: verticalScale(10),
    resizeMode: 'contain',
  },
  logo: {
    height: horizontalScale(31.4),
    width: verticalScale(150),
    resizeMode: 'contain',
  },
  backBtn: {
    height: horizontalScale(50),
    width: horizontalScale(50),

    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? normalize(-10) : 0,
    marginLeft: normalize(-15),
  },
  backBtn1: {
    height: horizontalScale(20),
    width: horizontalScale(20),
  },
  innerBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default Rounds;
