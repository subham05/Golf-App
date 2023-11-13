// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   StatusBar,
//   FlatList,
//   KeyboardAvoidingView,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {Colors, Fonts, Icons} from '../../themes/ImagePath';
// import normalize from '../../utils/helpers/dimen';
// import MyStatusBar from '../../utils/MyStatusBar';
// import Header from '../../components/Header';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   courseListRequest,
//   searchcourseListRequest,
//   searchcourseListRequest1,
//   setCourseName,
//   setSelectedHole,
//   storeCourseId,
//   storeNumberHoles,
// } from '../../redux/Reducer/GolfCourseReducer';
// import SearchCard from '../../components/SearchCard';
// import SearchDefaultCard from '../../components/SearchDefaultCard';
// import {hasLocationPermission} from '../../utils/helpers/Common';
// import Geolocation from '@react-native-community/geolocation';
// import SearchGreenCard from '../../components/SearchGreenCard';
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from '../../utils/helpers/size';
// import Loader from '../../utils/helpers/Loader';
// import SafeView from '../../components/SafeView';
// import showErrorAlert from '../../utils/helpers/Toast';

// let status = '';
// var Page1 = 1;
// var Page2 = 1;
// const ReportMappingScreen = ({navigation}) => {
//   const [searchdata, setsearchdata] = useState('');
//   const [value, setvalue] = useState('');
//   const [currentLongitude, setCurrentLongitude] = useState(undefined);
//   const [currentLatitude, setCurrentLatitude] = useState(undefined);
//   const [locdata, setLockData] = useState([]);
//   const [searchnamelist, setSearchNameList] = useState([]);
//   const [defaultlist, setDefaultList] = useState([]);
//   const dispatch = useDispatch();
//   const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
//   const searchList = val => {
//     // 22.575293610319722, 88.42777082574625
//     let obj = {
//       active: 1,
//       page: 1,
//       resultsPerPage: 50,
//       radius: 100,
//       courseName: value,
//       courseName: val,
//       // referenceLongitude: 88.427595,
//       // referenceLatitude: 22.575248,
//       // referenceLongitude: locdata[1],
//       // referenceLatitude: locdata[0],
//     };
//     dispatch(searchcourseListRequest(obj));
//   };
//   const searchList1 = (val, page) => {
//     if (page <= 5) {
//       let obj = {
//         active: 1,
//         page: page,
//         resultsPerPage: 50,
//         radius: 100,
//         courseName: val,
//       };
//       dispatch(searchcourseListRequest1(obj));
//     }
//   };
//   const defaultList = page => {
//     // 22.575293610319722, 88.42777082574625
//     if (page <= 5) {
//       let obj = {
//         active: 1,
//         page: page,

//         resultsPerPage: 50,
//         radius: 20,
//         // referenceLongitude: 88.427595,
//         // referenceLatitude: 22.575248,
//         referenceLongitude: locdata[1],
//         referenceLatitude: locdata[0],
//       };
//       dispatch(courseListRequest(obj));
//     }
//   };

//   useEffect(() => {
//     locationPop();
//     Page1 = 1;
//     Page2 = 1;
//   }, []);
//   console.log('page::', Page1, Page2);
//   useEffect(() => {
//     if (GolfCourseReducer.status == 'GolfCourse/favouriteSuccess') {
//     }
//   }, [GolfCourseReducer.status]);
//   useEffect(() => {
//     defaultList(1);
//     console.log('enter');
//   }, [locdata]);
//   const getOneTimeLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const currentLongitude = JSON.stringify(position.coords.longitude);
//         const currentLatitude = JSON.stringify(position.coords.latitude);
//         setLockData([currentLatitude, currentLongitude]);
//         setCurrentLatitude(currentLatitude);
//         setCurrentLongitude(currentLongitude);
//       },
//       error => {
//         // setLocationStatus(error.message);
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 30000,
//         maximumAge: 1000,
//       },
//     );
//   };
//   async function locationPop() {
//     let popup;
//     popup = await hasLocationPermission();
//     console.log('pop', popup);
//     if (popup == true) {
//       getOneTimeLocation();
//     }
//   }
//   console.log('locationCordinates', locdata);

//   if (status == '' || GolfCourseReducer?.status != status) {
//     switch (GolfCourseReducer?.status) {
//       case 'GolfCourse/searchcourseListRequest':
//         status = GolfCourseReducer?.status;
//         break;

//       case 'GolfCourse/searchcourseListSuccess':
//         status = GolfCourseReducer?.status;
//         if (GolfCourseReducer?.courseList1?.length == 0) {
//           showErrorAlert('No courses are found');
//         }
//         break;

//       case 'GolfCourse/searchcourseListFailure':
//         status = GolfCourseReducer?.status;
//         showErrorAlert(GolfCourseReducer?.error?.ErrorDetails[0]);
//         // Keyboard.dismiss();
//         break;
//     }
//   }
//   RenderFooter = () => {
//     console.log('---enter----');
//     if (
//       GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest2' ||
//       GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest1'
//     )
//       return <ActivityIndicator size={30} color={Colors.yellow} />;
//     return null;
//   };
//   useEffect(() => {
//     if (GolfCourseReducer.status == 'GolfCourse/courseListSuccess')
//       setDefaultList([...defaultlist, ...GolfCourseReducer?.courseList]);
//     else if (GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess') {
//       setSearchNameList(GolfCourseReducer?.courseList1);
//     } else if (
//       GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess1'
//     ) {
//       setSearchNameList([...searchnamelist, ...GolfCourseReducer?.courseList1]);
//     }
//   }, [GolfCourseReducer.status]);
//   return (
//     <>
//       <SafeView>
//         <MyStatusBar backgroundColor={Colors.bgColor} />
//         <Loader
//           visible={GolfCourseReducer.status == 'GolfCourse/courseListRequest'}
//         />
//         <KeyboardAvoidingView
//           style={styles.container}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <Header />

//           <View
//             style={{
//               paddingHorizontal: normalize(12),
//               paddingBottom: normalize(5),
//             }}>
//             <Text style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
//               Report mapping issue
//             </Text>
//             <View style={styles.search}>
//               <Image
//                 style={{
//                   height: normalize(13),
//                   width: normalize(13),
//                   marginRight: 11,
//                 }}
//                 source={Icons.Search}
//               />
//               <TextInput
//                 placeholder="Search Golf Courses"
//                 selectionColor={Colors.semiDark}
//                 placeholderTextColor={Colors.semiDark}
//                 style={[
//                   styles.searchText,
//                   {
//                     // backgroundColor: 'red',
//                     width: normalize(200),
//                   },
//                 ]}
//                 value={value}
//                 onChangeText={val => {
//                   searchList(val);
//                   setvalue(val);
//                   Page1 = 1;
//                   Page2 = 1;
//                 }}
//               />
//               {value.length > 0 && (
//                 <TouchableOpacity
//                   onPress={() => setvalue('')}
//                   style={{position: 'absolute', right: normalize(10)}}>
//                   <Image
//                     style={{
//                       height: normalize(15),
//                       width: normalize(15),
//                       // marginRight: 11,
//                     }}
//                     source={Icons.Cancel}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>
//           {GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest' && (
//             <Text style={styles.loading}>Searching Courses...</Text>
//           )}
//           {/* {GolfCourseReducer.status == 'GolfCourse/courseListRequest' && (
//           <Text style={styles.loading}>Loading...</Text>
//         )} */}

//           {value != '' ? (
//             <FlatList
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{
//                 paddingBottom: verticalScale(30),
//                 paddingBottom:
//                   Platform.OS == 'ios' ? normalize(20) : normalize(200),
//                 paddingHorizontal: normalize(12),
//               }}
//               style={{marginTop: '5%'}}
//               data={searchnamelist}
//               onEndReached={() => {
//                 if (
//                   GolfCourseReducer.status !=
//                   'GolfCourse/searchcourseListRequest1'
//                 )
//                   searchList1(value, ++Page1);
//               }}
//               renderItem={({item}) => (
//                 <SearchDefaultCard
//                   color={Colors.white}
//                   data={item}
//                   onPress={() => {
//                     dispatch(setSelectedHole([]));
//                     dispatch(setCourseName(item?.courseName));
//                     dispatch(storeCourseId(item?.id_course));
//                     dispatch(storeNumberHoles(item?.layoutHoles));
//                     navigation.navigate('ReportIssueScreen');
//                   }}
//                 />
//               )}
//               ListFooterComponent={RenderFooter()}
//               keyExtractor={item => item.id}
//             />
//           ) : (
//             <FlatList
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{
//                 paddingBottom: verticalScale(30),
//                 paddingBottom:
//                   Platform.OS == 'ios' ? normalize(20) : normalize(200),
//                 paddingHorizontal: normalize(12),
//               }}
//               style={{marginTop: '5%'}}
//               data={defaultlist}
//               onEndReached={() => defaultList(++Page2)}
//               renderItem={({item}) => (
//                 <SearchDefaultCard
//                   color={Colors.white}
//                   data={item}
//                   onPress={() => {
//                     dispatch(setSelectedHole([]));
//                     dispatch(setCourseName(item?.courseName));
//                     dispatch(storeCourseId(item?.id_course));
//                     dispatch(storeNumberHoles(item?.layoutHoles));
//                     navigation.navigate('ReportIssueScreen');
//                   }}
//                 />
//               )}
//               keyExtractor={item => item.id}
//             />
//           )}
//         </KeyboardAvoidingView>
//       </SafeView>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   separator: {
//     width: '100%',
//     borderTopWidth: 3,
//     borderTopColor: Colors.black3,
//     marginVertical: 5,
//   },
//   search: {
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     backgroundColor: Colors.greyMedium,
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingHorizontal: normalize(18),
//     marginTop: normalize(20),
//     borderColor: Colors.darkStroke,
//     borderWidth: 1,
//     height: normalize(40),
//   },
//   searchText: {color: Colors.white, fontFamily: Fonts.RobotoRegular},
//   title: {
//     fontSize: normalize(11),
//     color: Colors.white,
//     // fontWeight: 'bold',
//     alignSelf: 'center',
//     marginVertical: normalize(10),
//     textTransform: 'uppercase',
//     letterSpacing: 4,
//   },
//   card: {
//     backgroundColor: Colors.greyMedium,
//     padding: 13,
//     borderRadius: 13,
//     marginTop: 18,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   Icon: {
//     height: 30,
//     width: 30,
//   },
//   row: {flexDirection: 'row', alignItems: 'center'},
//   textMenu: {
//     fontSize: normalize(14),
//     color: Colors.white,
//     marginLeft: normalize(21),
//   },
//   FrontImg: {
//     height: 20,
//     width: 20,
//   },
//   navBar: {
//     // height: '15%',
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: StatusBar.currentHeight,
//     padding: normalize(15),
//   },
//   back: {
//     height: 18,
//     width: 18,
//     resizeMode: 'contain',
//   },
//   logo: {
//     height: 31.4,
//     width: 150,
//     resizeMode: 'contain',
//   },
//   backBtn: {
//     position: 'absolute',
//     left: 0,
//   },
//   flagText: {
//     color: Colors.white,
//     fontSize: normalize(13),
//     marginLeft: normalize(9),
//   },
//   head: {
//     color: Colors.primary,
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   loading: {
//     color: Colors.white,
//     fontSize: normalize(12),
//     alignSelf: 'center',
//     marginVertical: normalize(14),
//   },
// });
// export default ReportMappingScreen;

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
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollViewBase,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  courseListRequest,
  courseListRequest1,
  searchcourseListRequest,
  searchcourseListRequest1,
  setCourseName,
  setSelectedHole,
  storeCourseId,
  storeNumberHoles,
} from '../../redux/Reducer/GolfCourseReducer';
import SearchCard from '../../components/SearchCard';
import SearchDefaultCard from '../../components/SearchDefaultCard';
import {hasLocationPermission} from '../../utils/helpers/Common';
import Geolocation from '@react-native-community/geolocation';
import SearchGreenCard from '../../components/SearchGreenCard';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/helpers/size';
import Loader from '../../utils/helpers/Loader';
import SafeView from '../../components/SafeView';
import showErrorAlert from '../../utils/helpers/Toast';

let status = '';
var Page1 = 1;
var Page2 = 1;
const ReportMappingScreen = ({navigation}) => {
  const [searchdata, setsearchdata] = useState('');
  const [value, setvalue] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState(undefined);
  const [currentLatitude, setCurrentLatitude] = useState(undefined);
  const [locdata, setLockData] = useState([]);
  const [searchnamelist, setSearchNameList] = useState([]);
  const [defaultlist, setDefaultList] = useState([]);
  const dispatch = useDispatch();
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const searchList = val => {
    // 22.575293610319722, 88.42777082574625
    let obj = {
      active: 1,
      page: 1,
      resultsPerPage: 50,
      radius: 100,
      courseName: value,
      courseName: val,
      // referenceLongitude: 88.427595,
      // referenceLatitude: 22.575248,
      // referenceLongitude: locdata[1],
      // referenceLatitude: locdata[0],
    };
    dispatch(searchcourseListRequest(obj));
  };
  const searchList1 = (val, page) => {
    if (page <= 5) {
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
  const defaultList = () => {
    // 22.575293610319722, 88.42777082574625

    let obj = {
      active: 1,
      page: 1,

      resultsPerPage: 50,
      radius: 20,
      // referenceLongitude: 88.427595,
      // referenceLatitude: 22.575248,
      referenceLongitude: locdata[1],
      referenceLatitude: locdata[0],
    };
    dispatch(courseListRequest(obj));
  };
  const defaultList1 = page => {
    // 22.575293610319722, 88.42777082574625
    if (page <= 5) {
      let obj = {
        active: 1,
        page: page,

        resultsPerPage: 50,
        radius: 20,
        // referenceLongitude: 88.427595,
        // referenceLatitude: 22.575248,
        referenceLongitude: locdata[1],
        referenceLatitude: locdata[0],
      };
      dispatch(courseListRequest1(obj));
    }
  };

  useEffect(() => {
    Page1 = 1;
    Page2 = 1;
    locationPop();
  }, []);
  // console.log('page::', Page1, Page2);
  useEffect(() => {
    if (GolfCourseReducer.status == 'GolfCourse/favouriteSuccess') {
    }
  }, [GolfCourseReducer.status]);
  useEffect(() => {
    if (locdata[1] !== undefined && locdata[0] !== undefined) {
      defaultList();
    }
    // console.log('enter');
  }, [locdata]);
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLockData([currentLatitude, currentLongitude]);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      error => {
        // setLocationStatus(error.message);
      },
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
  console.log('locationCordinates', locdata);

  if (status == '' || GolfCourseReducer?.status != status) {
    switch (GolfCourseReducer?.status) {
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
    }
  }
  RenderFooter = () => {
    // console.log('---enter----');
    if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest2' ||
      GolfCourseReducer.status == 'GolfCourse/searchcourseListRequest1'
    )
      return <ActivityIndicator size={30} color={Colors.yellow} />;
    return null;
  };
  useEffect(() => {
    if (GolfCourseReducer.status == 'GolfCourse/courseListSuccess1') {
      // console.log('entyerdjasdj');
      setDefaultList([...defaultlist, ...GolfCourseReducer?.courseList]);
    } else if (GolfCourseReducer.status == 'GolfCourse/courseListSuccess') {
      setDefaultList([...GolfCourseReducer?.courseList]);
    } else if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess'
    ) {
      setSearchNameList(GolfCourseReducer?.courseList1);
    } else if (
      GolfCourseReducer.status == 'GolfCourse/searchcourseListSuccess1'
    ) {
      setSearchNameList([...searchnamelist, ...GolfCourseReducer?.courseList1]);
    }
  }, [GolfCourseReducer.status]);
  console.log('defaultlist', defaultlist, GolfCourseReducer.status);
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Loader
          visible={
            GolfCourseReducer.status == 'GolfCourse/courseListRequest' ||
            locdata[0] == undefined ||
            locdata[1] == undefined ||
            GolfCourseReducer.status == 'GolfCourse/courseListRequest1'
          }
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <FlatList
            alwaysBounceHorizontal={false}
            bounces={false}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: verticalScale(30),
              paddingBottom: normalize(20),
              paddingHorizontal: normalize(12),
            }}
            ListHeaderComponent={
              <View
                style={{
                  backgroundColor: Colors.bgColor,
                  marginHorizontal: normalize(-12),
                }}>
                <Header />

                <View
                  style={{
                    paddingBottom: normalize(5),
                    paddingHorizontal: normalize(12),
                  }}>
                  <Text
                    style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
                    Report mapping issue
                  </Text>
                  <View style={styles.search}>
                    <Image
                      style={{
                        height: normalize(13),
                        width: normalize(13),
                        marginRight: 11,
                      }}
                      source={Icons.Search}
                    />
                    <TextInput
                      placeholder="Search Golf Courses"
                      selectionColor={Colors.semiDark}
                      placeholderTextColor={Colors.semiDark}
                      style={[
                        styles.searchText,
                        {
                          // backgroundColor: 'red',
                          width: normalize(200),
                        },
                      ]}
                      value={value}
                      onChangeText={val => {
                        searchList(val);
                        setvalue(val);

                        Page2 = 1;
                      }}
                    />
                    {value.length > 0 && (
                      <TouchableOpacity
                        onPress={() => setvalue('')}
                        style={{position: 'absolute', right: normalize(10)}}>
                        <Image
                          style={{
                            height: normalize(15),
                            width: normalize(15),
                            // marginRight: 11,
                          }}
                          source={Icons.Cancel}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            }
            data={[1]}
            renderItem={({item}) => (
              <>
                {GolfCourseReducer.status ==
                  'GolfCourse/searchcourseListRequest' && (
                  <Text style={styles.loading}>Searching Courses...</Text>
                )}
                {value != '' ? (
                  <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingBottom: verticalScale(30),
                      paddingBottom: Platform.OS == normalize(20),
                      paddingHorizontal: normalize(12),
                    }}
                    style={{marginTop: '5%'}}
                    data={searchnamelist}
                    onEndReached={() => {
                      if (
                        GolfCourseReducer.status !=
                        'GolfCourse/searchcourseListRequest1'
                      )
                        searchList1(value, ++Page1);
                    }}
                    renderItem={({item}) => (
                      <SearchDefaultCard
                        color={Colors.white}
                        data={item}
                        onPress={() => {
                          dispatch(setSelectedHole([]));
                          dispatch(setCourseName(item?.courseName));
                          dispatch(storeCourseId(item?.id_course));
                          dispatch(storeNumberHoles(item?.layoutHoles));
                          navigation.navigate('ReportIssueScreen');
                        }}
                      />
                    )}
                    ListFooterComponent={RenderFooter()}
                    keyExtractor={item => item.id}
                  />
                ) : (
                  <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingBottom: verticalScale(30),
                      paddingBottom: normalize(20),
                      paddingHorizontal: normalize(12),
                    }}
                    style={{marginTop: '5%'}}
                    data={defaultlist}
                    onEndReached={() => defaultList1(++Page2)}
                    renderItem={({item}) => (
                      <SearchDefaultCard
                        color={Colors.white}
                        data={item}
                        onPress={() => {
                          dispatch(setSelectedHole([]));
                          dispatch(setCourseName(item?.courseName));
                          dispatch(storeCourseId(item?.id_course));
                          dispatch(storeNumberHoles(item?.layoutHoles));
                          navigation.navigate('ReportIssueScreen');
                        }}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                )}
              </>
            )}
          />

          {/* {GolfCourseReducer.status == 'GolfCourse/courseListRequest' && (
          <Text style={styles.loading}>Loading...</Text>
        )} */}
        </KeyboardAvoidingView>
      </SafeView>
    </>
  );
};
const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderTopWidth: 3,
    borderTopColor: Colors.black3,
    marginVertical: 5,
  },
  search: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: Colors.greyMedium,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: normalize(18),
    marginTop: normalize(20),
    borderColor: Colors.darkStroke,
    borderWidth: 1,
    height: normalize(40),
  },
  searchText: {color: Colors.white, fontFamily: Fonts.RobotoRegular},
  title: {
    fontSize: normalize(11),
    color: Colors.white,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: normalize(10),
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  card: {
    backgroundColor: Colors.greyMedium,
    padding: 13,
    borderRadius: 13,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Icon: {
    height: 30,
    width: 30,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  textMenu: {
    fontSize: normalize(14),
    color: Colors.white,
    marginLeft: normalize(21),
  },
  FrontImg: {
    height: 20,
    width: 20,
  },
  navBar: {
    // height: '15%',
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
  flagText: {
    color: Colors.white,
    fontSize: normalize(13),
    marginLeft: normalize(9),
  },
  head: {
    color: Colors.primary,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  loading: {
    color: Colors.white,
    fontSize: normalize(12),
    alignSelf: 'center',
    marginVertical: normalize(14),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.line,
    alignSelf: 'center',
  },
});
export default ReportMappingScreen;
