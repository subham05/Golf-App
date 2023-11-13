import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import Buttons from '../../components/Buttons';
import normalize from '../../utils/helpers/dimen';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import SafeView from '../../components/SafeView';
import {horizontalScale, verticalScale} from '../../utils/helpers/size';
import Header from '../../components/Header';
import {calcH} from '../../utils/helpers/window';
import UpdateFirmware from '../../components/UpdateFirmware';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import MyStatusBar from '../../utils/MyStatusBar';
import {
  SeacrchValueStore,
  courseDetailsRequest,
  courseListRequest,
  courseListRequest1,
  deviceCourseDataDetailsPublicRequest,
  searchcourseListRequest,
  searchcourseListRequest1,
  searchcourseListRequest2,
  searchcourseListSuccess,
  updateCourseCountRequest,
} from '../../redux/Reducer/GolfCourseReducer';
import SearchCard from '../../components/SearchCard';
import SearchDefaultCard from '../../components/SearchDefaultCard';
import {useEffect} from 'react';
import {hasLocationPermission} from '../../utils/helpers/Common';
import Geolocation from '@react-native-community/geolocation';
import SearchGreenCard from '../../components/SearchGreenCard';
import {
  addeGreenListRequest,
  advanceGreenListRequest,
  deleteAdvanceGreenListItemRequest,
} from '../../redux/Reducer/HomeReducer';
import AdvanceGreenListCard from '../../components/AdvanceGreenListCard';
import showErrorAlert from '../../utils/helpers/Toast';
import Loader from '../../utils/helpers/Loader';
import Realm from 'realm';
import {BleContext} from '../../utils/helpers/BleBoundary';
// create a component

let status = '';
let realm = new Realm({path: 'Powakaddy.realm'});
var Page1 = 1;
var Page2 = 1;
var Page3 = 1;
const CourseSearch = props => {
  const [isSlider, setisSlider] = useState(1);
  const [isSearch, setisSearch] = useState(false);
  const [value, setvalue] = useState('');
  const [value1, setvalue1] = useState('');
  const [advValue, setadvValue] = useState('');
  const [ClickItem, setClickItem] = useState('');
  const [loader, setloader] = useState(false);
  const [done, setDone] = useState(false);
  const [loader1, setloader1] = useState(false);
  const [done1, setdone1] = useState(false);
  const [modalview, setmodal] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState(undefined);
  const [currentLatitude, setCurrentLatitude] = useState(undefined);
  const [locdata, setLockData] = useState([]);
  const [GreenDisplayListData, setGreenDisplayListData] = useState([]);

  const [greenSearchList, setGreenSearchList] = useState([]);

  const dispatch = useDispatch();
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const [maxModal, setMaxModal] = useState(false);
  const [courseDis, setCourseDis] = useState(0);
  const [defaultlist, setDefaultList] = useState([]);
  console.log('defaultlist', defaultlist, GolfCourseReducer.status);
  const [searchnamelist, setSearchNameList] = useState([]);
  const context = useContext(BleContext);
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));
  // console.log('deviceObj', deviceObj);
  useEffect(() => {
    context.getDevicceMTU(deviceObj[0]?.id, res => {
      console.log('reMTUGATT=========', res);
    });
  }, []);
  const searchList = val => {
    let obj = {
      active: 1,
      page: 1,
      resultsPerPage: 50,
      radius: 100,
      courseName: val,
    };

    dispatch(searchcourseListRequest(obj));
  };
  const searchList1 = (val, page) => {
    // console.log('Hello 1', page);
    if (page <= 5) {
      // console.log('Hello 1', page);
      let obj = {
        active: 1,
        page: page,
        resultsPerPage: 50,
        radius: 100,
        courseName: val,
      };
      dispatch(searchcourseListRequest1(obj));
    }
  };
  const searchList2 = (val, page) => {
    // console.log('Hello 1', page);
    if (page <= 5) {
      // console.log('Hello 1', page);
      let obj = {
        active: 1,
        page: page,
        resultsPerPage: 50,
        radius: 100,
        courseName: val,
      };
      dispatch(searchcourseListRequest2(obj));
    }
  };
  const checkGreenList = () => {
    // console.log('++++++++++++++++++++');
    if (
      (advValue != '' && !_.isEmpty(GolfCourseReducer?.courseList1)) ||
      !_.isEmpty(GreenDisplayListData)
    ) {
      const results = GolfCourseReducer?.courseList1?.filter(
        ({id_course: id1}) =>
          !GreenDisplayListData.some(({course_id: id2}) => id2 === id1),
      );
      setGreenSearchList(results);
      // setGreenSearchList(results);
      // if (greenSearchList !== undefined) {
      //   setGreenSearchList([...greenSearchList, ...results]);
      // } else {
      //   setGreenSearchList(results);
      // }
    }
  };
  const checkGreenList1 = () => {
    // console.log('====================');
    if (
      (advValue != '' && !_.isEmpty(GolfCourseReducer?.courseList1)) ||
      !_.isEmpty(GreenDisplayListData)
    ) {
      const results = GolfCourseReducer?.courseList1?.filter(
        ({id_course: id1}) =>
          !GreenDisplayListData.some(({course_id: id2}) => id2 === id1),
      );
      setGreenSearchList([...greenSearchList, ...results]);
    }
  };

  const defaultList = () => {
    let obj = {
      active: 1,
      page: 1,

      resultsPerPage: 50,
      radius: 20,

      referenceLongitude: locdata[1],
      referenceLatitude: locdata[0],
    };
    dispatch(courseListRequest(obj));
  };
  const defaultList1 = page => {
    let obj = {
      active: 1,
      page: page,

      resultsPerPage: 50,
      radius: 20,

      referenceLongitude: locdata[1],
      referenceLatitude: locdata[0],
    };
    dispatch(courseListRequest1(obj));
  };

  useEffect(() => {
    Page1 = 1;
    Page2 = 1;
    Page3 = 1;
    locationPop();
  }, []);

  useEffect(() => {
    if (HomeReducer.status === 'Home/advanceGreenListSuccess') {
      let greenDisplayData = HomeReducer?.advanceGreenList;

      setGreenDisplayListData(greenDisplayData);
    } else if (HomeReducer.status === 'Home/advanceGreenListFailure') {
      setGreenDisplayListData([]);
    }
  }, [GolfCourseReducer.status, HomeReducer.status]);

  useEffect(() => {
    defaultList();
    dispatch(advanceGreenListRequest());
  }, [locdata]);

  const getOneTimeLocation = () => {
    // console.log('++++POSITIUON+++++');
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLockData([currentLatitude, currentLongitude]);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  async function locationPop() {
    let popup;
    popup = await hasLocationPermission();
    console.log('pop', popup);
    if (popup == true) {
      getOneTimeLocation();
    }
  }

  useEffect(() => {
    if (HomeReducer.status === 'Home/deleteAdvanceGreenListItemSuccess') {
      dispatch(advanceGreenListRequest());
    }
  }, [HomeReducer.status]);
  useEffect(() => {
    if (HomeReducer.status === 'Home/addGreenListSuccess') {
      setadvValue('');
      dispatch(advanceGreenListRequest());
    }
  }, [HomeReducer.status]);

  const updateCourse = () => {
    props.navigation.navigate('CourseUpdateProcess', {
      courseName:
        GolfCourseReducer?.deviceCourseDataDetailsPublicRes?.courseName,
      courseDis: courseDis,
      deviceCourseCount: deviceObj[0]?.courseCount,
      serverDetails: GolfCourseReducer?.deviceCourseDataDetailsPublicRes,
      deviceMTU: deviceObj[0]?.mtu,
      deviceID: deviceObj[0]?.id,
      deviceName: deviceObj[0]?.bluetoothName,
    });
  };

  if (status == '' || GolfCourseReducer?.status != status) {
    switch (GolfCourseReducer?.status) {
      case 'GolfCourse/courseDetailsRequest':
        status = GolfCourseReducer?.status;
        break;

      case 'GolfCourse/courseDetailsSuccess':
        status = GolfCourseReducer?.status;
        if (GolfCourseReducer?.courseDetails?.gpsAvailable == 1) {
          let obj = {
            id_course: GolfCourseReducer?.courseDetails?.id_course,
            serialNumber: '436A188220098BA063500A6B06A50472', //deviceObj[0]?.serial_number, //'TGH20102058'  //'436A1882A029BA2A' //deviceObj[0]?.serial_number
            //436a1882a029ba2aa60d05d4da500472
          };
          // console.log('OBJECT', obj);
          dispatch(deviceCourseDataDetailsPublicRequest(obj));
        } else {
          showErrorAlert(
            'Update not available, there is no GPS data for the selected course',
          );
        }
        break;

      case 'GolfCourse/courseDetailsFailure':
        status = GolfCourseReducer?.status;
        break;

      case 'GolfCourse/searchcourseListRequest':
        status = GolfCourseReducer?.status;

        break;

      case 'GolfCourse/searchcourseListSuccess':
        status = GolfCourseReducer?.status;

        if (GolfCourseReducer?.courseList1?.length == 0) {
          showErrorAlert('No courses are found');
        }
        break;

      case 'GolfCourse/searchcourseListFailure':
        status = GolfCourseReducer?.status;
        showErrorAlert(GolfCourseReducer?.error?.ErrorDetails[0]);
        // Keyboard.dismiss();
        break;

      case 'GolfCourse/deviceCourseDataDetailsPublicRequest':
        status = GolfCourseReducer?.status;
        break;

      case 'GolfCourse/deviceCourseDataDetailsPublicSuccess':
        status = GolfCourseReducer?.status;
        if (
          GolfCourseReducer?.deviceCourseDataDetailsPublicRes?.totalCourses ==
          deviceObj[0]?.courseCount
        ) {
          // console.log('Course Update Process Initiate');
          updateCourse(courseDis);
        } else {
          let obj = {
            courseCount: deviceObj[0]?.courseCount,
            serialNumber: '436A188220098BA063500A6B06A50472', //deviceObj[0]?.serial_number,
          };
          dispatch(updateCourseCountRequest(obj));
        }
        break;

      case 'GolfCourse/deviceCourseDataDetailsPublicFailure':
        status = GolfCourseReducer?.status;
        showErrorAlert(GolfCourseReducer?.error?.ErrorDetails[0]);
        break;

      case 'GolfCourse/updateCourseCountRequest':
        status = GolfCourseReducer?.status;
        break;

      case 'GolfCourse/updateCourseCountSuccess':
        status = GolfCourseReducer?.status;
        let obj = {
          id_course: GolfCourseReducer?.courseDetails?.id_course,
          serialNumber: '436A188220098BA063500A6B06A50472', //deviceObj[0]?.serial_number, //'TGH20102058'  //'436A1882A029BA2A' //deviceObj[0]?.serial_number
          //436a1882a029ba2aa60d05d4da500472
        };
        // console.log('OBJECT', obj);
        dispatch(deviceCourseDataDetailsPublicRequest(obj));
        break;

      case 'GolfCourse/updateCourseCountFailure':
        status = GolfCourseReducer?.status;
        showErrorAlert(
          'Update not available, there is no GPS data for the selected course',
        );
        break;
    }
  }

  useEffect(() => {
    if (GolfCourseReducer.status == 'GolfCourse/courseListSuccess') {
      // console.log('setDefaultList ------------------------');
      setDefaultList([...GolfCourseReducer?.courseList]);
    } else if (GolfCourseReducer.status == 'GolfCourse/courseListSuccess1') {
      setDefaultList([...defaultlist, ...GolfCourseReducer?.courseList]);
    } else if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess'
    ) {
      setSearchNameList(GolfCourseReducer?.courseList1);
      checkGreenList();
    } else if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess1'
    ) {
      setSearchNameList([...searchnamelist, ...GolfCourseReducer?.courseList1]);
    } else if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess2'
    ) {
      checkGreenList1();
    }
  }, [GolfCourseReducer.status]);
  useEffect(() => {
    Page1 = 1;
    Page2 = 1;
    Page3 = 1;
  }, [isSlider]);
  RenderFooter = () => {
    if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest2' ||
      GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest1'
    )
      return <ActivityIndicator size={30} color={Colors.yellow} />;
    return null;
  };

  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Loader
          visible={
            GolfCourseReducer?.status == 'GolfCourse/courseDetailsRequest' ||
            HomeReducer?.status == 'Home/addeGreenListRequest' ||
            GolfCourseReducer?.status == 'GolfCourse/courseListRequest' ||
            HomeReducer?.status == 'Home/deleteAdvanceGreenListItemRequest' ||
            GolfCourseReducer?.status == 'GolfCourse/courseListRequest1' ||
            GolfCourseReducer?.status == 'GolfCourse/updateCourseCountRequest'
          }
        />
        <FlatList
          alwaysBounceVertical={false}
          bounces={false}
          contentContainerStyle={{paddingBottom: normalize(20)}}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          data={[1]}
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: Colors.bgColor,
              }}>
              <Header />
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  height: calcH(0.05),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 15,
                    letterSpacing: 2,
                    fontFamily: Fonts.RobotoRegular,
                  }}>
                  COURSES
                </Text>
              </View>
              <View
                style={{paddingHorizontal: normalize(12), paddingBottom: '5%'}}>
                <View style={styles.line}></View>
                <View
                  style={{
                    height: calcH(0.07),
                    alignItems: 'center',

                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => setisSlider(1)}
                    style={{
                      height: '100%',
                      width: '50%',
                      // alignItems: 'flex-start',
                      justifyContent: 'center',
                      // backgroundColor:'red'
                      borderBottomWidth: isSlider == 1 ? 1 : 0,
                      borderBottomColor: Colors.yellow,
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(10),
                        color: isSlider == 1 ? Colors.primary : Colors.white,
                        textTransform: 'capitalize',
                        // marginLeft: normalize(15),
                        textAlign: 'center',
                        fontFamily: Fonts.RobotoRegular,
                      }}>
                      Course Search
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setisSlider(2);
                    }}
                    style={{
                      height: '100%',
                      width: '50%',
                      // alignItems: 'flex-end',
                      justifyContent: 'center',
                      borderBottomWidth: isSlider == 2 ? 1 : 0,
                      borderBottomColor: Colors.yellow,
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(10),
                        color: isSlider == 2 ? Colors.primary : Colors.white,
                        textAlign: 'center',
                        // marginRight: normalize(15),
                        textAlign: 'center',
                        fontFamily: Fonts.RobotoRegular,
                      }}>
                      Advanced Green Display
                    </Text>
                  </TouchableOpacity>
                </View>
                {isSlider == 1 ? (
                  <View style={styles.search}>
                    <Image
                      style={{
                        height: horizontalScale(12),
                        width: horizontalScale(12),
                        marginLeft: verticalScale(13),
                        marginRight: verticalScale(13),
                      }}
                      source={Icons.Search}
                    />
                    <TextInput
                      placeholder="Search Golf Courses"
                      cursorColor={Colors.semiDark}
                      selectionColor={Colors.semiDark}
                      onChangeText={val => {
                        setvalue(val), setisSearch(true), searchList(val);
                        // dispatch(SeacrchValueStore(val));

                        Page2 = 1;
                        Page3 = 1;
                      }}
                      value={value}
                      placeholderTextColor={Colors.semiDark}
                      style={{
                        color: Colors.white,
                        width: '80%',
                        fontFamily: Fonts.RobotoRegular,
                      }}
                    />
                    {value ? (
                      <TouchableOpacity
                        onPress={() => {
                          setisSearch(false), setvalue('');
                        }}>
                        <Image
                          style={{
                            height: horizontalScale(20),
                            width: horizontalScale(20),
                          }}
                          source={Icons.Cancel}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : (
                  <View style={styles.search2}>
                    <Image
                      style={{
                        height: horizontalScale(12),
                        width: horizontalScale(12),
                        marginLeft: verticalScale(13),
                        marginRight: verticalScale(13),
                      }}
                      source={Icons.Search}
                    />
                    <TextInput
                      placeholder="Search Golf Courses"
                      selectionColor={Colors.semiDark}
                      cursorColor={Colors.semiDark}
                      onChangeText={val => {
                        setadvValue(val);
                        searchList(val);
                        setvalue1(val);

                        Page2 = 1;
                        Page3 = 1;
                      }}
                      value={advValue}
                      placeholderTextColor={Colors.semiDark}
                      style={{
                        color: Colors.white,
                        width: '80%',
                        fontFamily: Fonts.RobotoRegular,
                      }}
                    />
                    {advValue ? (
                      <TouchableOpacity
                        onPress={() => {
                          setisSearch(false), setadvValue('');
                        }}>
                        <Image
                          style={{
                            height: horizontalScale(20),
                            width: horizontalScale(20),
                          }}
                          source={Icons.Cancel}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}
              </View>
            </View>
          }
          renderItem={() => (
            <>
              {isSlider == 1 ? (
                <>
                  {GolfCourseReducer.status ==
                    'GolfCourse/searchcourseListRequest' && (
                    <Text style={styles.loading}>Searching Courses...</Text>
                  )}

                  {value != '' ? (
                    <FlatList
                      style={{paddingHorizontal: normalize(12)}}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{paddingBottom: normalize(20)}}
                      data={searchnamelist}
                      renderItem={({item}) => (
                        <SearchCard
                          data={item}
                          onPress={() => {
                            setloader(true);

                            setDone(true);
                            setCourseDis(item?.distance);
                            if (!_.isEmpty(deviceObj)) {
                              dispatch(
                                courseDetailsRequest({
                                  id_course: item?.id_course,
                                }),
                              );
                            } else {
                              props.navigation.navigate('NotPairedDevice');
                            }
                          }}
                        />
                      )}
                      keyExtractor={item => item.id}
                      onEndReached={() => {
                        if (
                          GolfCourseReducer.status !=
                          'GolfCourse/searchcourseListRequest1'
                        ) {
                          searchList1(value, ++Page2);
                        }
                      }}
                      ListFooterComponent={RenderFooter()}
                    />
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      style={{paddingHorizontal: normalize(12)}}
                      contentContainerStyle={{paddingBottom: normalize(20)}}
                      data={defaultlist}
                      onEndReached={() => defaultList1(++Page1)}
                      renderItem={({item}) => (
                        <SearchDefaultCard
                          data={item}
                          onPress={() => {
                            setloader(true);

                            setDone(true);
                            setCourseDis(item?.distance);
                            if (!_.isEmpty(deviceObj)) {
                              dispatch(
                                courseDetailsRequest({
                                  id_course: item?.id_course,
                                }),
                              );
                            } else {
                              props.navigation.navigate('NotPairedDevice');
                            }
                          }}
                        />
                      )}
                      keyExtractor={item => item.id}
                    />
                  )}
                </>
              ) : (
                <>
                  {GolfCourseReducer.status ==
                    'GolfCourse/searchcourseListRequest' && (
                    <Text style={styles.loading}>Searching...</Text>
                  )}
                  {advValue != '' ? (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      style={{paddingHorizontal: normalize(12)}}
                      data={greenSearchList}
                      contentContainerStyle={{paddingBottom: normalize(20)}}
                      onEndReached={() => {
                        if (
                          GolfCourseReducer.status !=
                          'GolfCourse/searchcourseListRequest2'
                        ) {
                          searchList2(value1, ++Page3);
                        }
                      }}
                      renderItem={({item}) => (
                        <SearchGreenCard
                          data={item}
                          onPress={() => {
                            if (GreenDisplayListData?.length == 20) {
                              setMaxModal(true);
                            } else {
                              let obj = {
                                course_id: item?.id_course,
                                course_name: item?.courseName,
                                location: `${item?.address1}${item?.address2}`,
                              };
                              dispatch(addeGreenListRequest(obj));
                            }
                            // item.status == true
                            //   ? setmodal(true)
                            //   : (setloader1(true),
                            //     setTimeout(() => {
                            //       setloader1(false);
                            //     }, 1000),
                            //     setdone1(true),
                            //     setarray(DATA3),
                            //     setisSearch(false),
                            //     setadvValue(''));
                          }}
                        />
                      )}
                      keyExtractor={item => item.id}
                      ListFooterComponent={RenderFooter()}
                    />
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor:'red'
                      }}>
                      {GreenDisplayListData?.length !== 0 ? (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          style={{paddingHorizontal: normalize(12)}}
                          data={GreenDisplayListData}
                          renderItem={({item}) => (
                            <AdvanceGreenListCard
                              data={item}
                              deletePress={() => {
                                setClickItem(item?._id);
                                setmodal(true);
                              }}
                            />
                          )}
                          keyExtractor={item => item.id}
                        />
                      ) : (
                        <View
                          style={{
                            marginTop: normalize(-80),
                          }}>
                          <Image
                            source={Icons.GreenNone}
                            style={{
                              resizeMode: 'contain',
                              width: normalize(140),
                              height: normalize(140),
                              alignSelf: 'center',
                              marginBottom: normalize(30),
                            }}
                          />
                          <Text
                            style={{
                              color: Colors.white,
                              fontFamily: Fonts.RobotoMedium,
                              textAlign: 'center',
                              fontSize: normalize(15),
                              marginBottom: normalize(5),
                            }}>
                            Search and Add a course.
                          </Text>
                          <Text
                            style={{
                              color: '#929292',
                              fontFamily: Fonts.RobotoRegular,
                              fontSize: normalize(10),
                              textAlign: 'center',
                            }}>
                            As no courses are found
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </>
              )}
            </>
          )}
        />

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
              backgroundColor: '#111111',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: normalize(20),
              width: '90%',
              alignSelf: 'center',
              borderRadius: normalize(30),
              paddingHorizontal: normalize(15),
              // flex: 1,
            }}>
            <Image
              source={Icons.delete1}
              style={{
                width: normalize(70),
                height: normalize(70),
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.RobotoMedium,
                fontSize: normalize(16),
                marginTop: normalize(10),
                textTransform: 'capitalize',
              }}>
              Are you sure?
            </Text>
            <Text
              style={{
                color: '#929292',
                fontFamily: Fonts.RobotoLight,
                fontSize: normalize(11),
                marginTop: normalize(10),
                textAlign: 'center',
                textTransform: 'capitalize',
                lineHeight: normalize(20),
              }}>
              Do you really want to delete these Scorecard? This Process Cannot
              Be Undone
            </Text>
            <Button
              borderWidth={2}
              borderColor={Colors.white}
              title={'CANCEL'}
              titlesingle={true}
              marginTop={normalize(14)}
              letterSpacing={2}
              fontSize={normalize(14)}
              fontFamily={Fonts.RobotoMedium}
              onPress={() => setmodal(false)}
            />
            <Button
              borderWidth={2}
              backgroundColor={Colors.yellow}
              // borderColor={Colors.white}
              title={'SUBMIT'}
              titlesingle={true}
              marginTop={normalize(10)}
              letterSpacing={2}
              textColor={Colors.black}
              fontSize={normalize(14)}
              fontFamily={Fonts.RobotoMedium}
              onPress={() => {
                setmodal(false);
                dispatch(deleteAdvanceGreenListItemRequest(ClickItem));
              }}
            />
          </View>
        </Modal>
        <Modal
          // transparent={true}
          isVisible={maxModal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackButtonPress={() => setMaxModal(false)}
          onBackdropPress={() => setMaxModal(false)}
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
              backgroundColor: '#111111',
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
              onPress={() => setMaxModal(false)}>
              <Image
                style={{
                  height: horizontalScale(20),
                  width: horizontalScale(20),
                }}
                source={Icons.Cancel}
              />
            </TouchableOpacity>
            <Image
              source={Icons.MaxCourse}
              style={{
                width: normalize(70),
                height: normalize(70),
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.RobotoMedium,
                fontSize: normalize(16),
                marginTop: normalize(10),
              }}>
              Maximum Limit 20 Courses
            </Text>
            <Text
              style={{
                color: '#929292',
                fontFamily: Fonts.RobotoLight,
                fontSize: normalize(11),
                marginTop: normalize(10),
                textAlign: 'center',
                lineHeight: normalize(20),
              }}>
              You are not allowed to add more than 20 courses
            </Text>
          </View>
        </Modal>
      </SafeView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  navBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rightArrow: {
    height: horizontalScale(25),
    width: horizontalScale(25),
    borderRadius: horizontalScale(25) + horizontalScale(25) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: horizontalScale(10),
    width: verticalScale(10),
    resizeMode: 'contain',
  },
  card: {
    height: horizontalScale(80),
    backgroundColor: Colors.background,
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  card2: {
    height: horizontalScale(80),
    backgroundColor: Colors.background,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    zIndex: 0,
  },
  head: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {flexDirection: 'row', alignItems: 'center'},

  search: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: Colors.background,
    borderRadius: 13,
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1.5,
    // height: calcH(0.06),

    marginTop: horizontalScale(15),
    position: 'relative',
    // top: 10,
    zIndex: 1,
    height: normalize(40),
  },
  search2: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: Colors.background,
    borderRadius: 13,
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,

    marginTop: horizontalScale(15),
    height: normalize(40),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.line,
    alignSelf: 'center',
  },
  right: {
    height: horizontalScale(12),
    width: verticalScale(12),
    resizeMode: 'contain',
  },
  write: {
    height: horizontalScale(25),
    width: verticalScale(25),
    resizeMode: 'contain',
  },
  logo: {
    height: horizontalScale(31.4),
    width: verticalScale(150),
    resizeMode: 'contain',
  },
  backBtn: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: horizontalScale(20) + horizontalScale(20) / 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },

  topView: {
    padding: normalize(15),
    marginTop: 90,
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  title1: {
    color: '#FFFFFF',
    fontSize: normalize(16),
    marginBottom: 15,
    marginTop: 90,
    fontFamily: Fonts.RobotoBold,
  },
  subtitle: {
    color: '#929292',
    fontSize: normalize(12),
    marginBottom: 0,
  },
  circleImage: {
    width: normalize(260),
    height: normalize(260),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  loading: {
    color: Colors.white,
    fontSize: normalize(12),
    alignSelf: 'center',
    marginVertical: normalize(14),
    fontFamily: Fonts.RobotoRegular,
  },
});

//make this component available to the app
export default CourseSearch;
