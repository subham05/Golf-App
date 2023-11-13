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
import React from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import Switch from '../../components/Switch';
import {reportMappingRequest} from '../../redux/Reducer/HomeReducer';
import Loader from '../../utils/helpers/Loader';
import {
  ReportMappingHolesRequest,
  setSelectedHole,
} from '../../redux/Reducer/GolfCourseReducer';
import SafeView from '../../components/SafeView';

let status = '';
const ReportIssueScreen = ({navigation}) => {
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const AuthReducer = useSelector(state => state?.AuthReducer);
  // console.log('AUTHREDUCER:', AuthReducer);
  // console.log('HOLE', GolfCourseReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const [enableHole, setEnableHole] = useState(false);
  const [enableGps, setEnableGps] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const submitReport = () => {
    const obj = {
      id_course: GolfCourseReducer?.courseId,
      email: AuthReducer?.userDetailsResponse?.data[0]?.email,
      holeArray: GolfCourseReducer?.selectedHoleData,
      gpsDistance: enableGps ? 1 : 0,
      auto_hole_advance: enableHole ? 1 : 0,
      note: query,
    };
    dispatch(ReportMappingHolesRequest(obj));
  };
  if (status == '' || GolfCourseReducer?.status != status) {
    switch (GolfCourseReducer?.status) {
      case 'GolfCourse/ReportMappingHolesRequest':
        status = HomeReducer?.status;
        break;

      case 'GolfCourse/ReportMappingHolesSuccess':
        status = GolfCourseReducer?.status;
        navigation.goBack();
        dispatch(setSelectedHole([]));
        const obj = {
          course_id: GolfCourseReducer?.courseId,
          course_name: GolfCourseReducer?.courseNameData,
          hole_number: GolfCourseReducer?.selectedHoleData,
          gps_distance: enableGps,
          auto_hole_advance: enableHole,
          note: query,
        };
        dispatch(reportMappingRequest(obj));
        break;

      case 'GolfCourse/ReportMappingHolesFailure':
        status = GolfCourseReducer?.status;
        break;
    }
  }
  return (
    <SafeView style={{backgroundColor: Colors.bgColor, flex: 1}}>
      <MyStatusBar backgroundColor={Colors.bgColor} />
      <Loader
        visible={
          HomeReducer.status == 'Home/reportMappingRequest' ||
          GolfCourseReducer?.status == 'GolfCourse/ReportMappingHolesRequest'
        }
      />
      <Header />
      <ScrollView
        style={{paddingHorizontal: 15}}
        contentContainerStyle={{
          paddingBottom: Platform.OS == 'ios' ? normalize(250) : 0,
        }}>
        <Text style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
          Report mapping issue
        </Text>
        <View style={styles.separator} />
        <View style={styles.cardToggle}>
          <Text style={[styles.toggleText, {fontFamily: Fonts.RobotoRegular}]}>
            Are The GPS Distances Correct?
          </Text>
          <Switch
            style={{marginRight: 10}}
            value={enableGps}
            onPress={() => setEnableGps(!enableGps)}
          />
        </View>
        <View style={styles.cardToggle}>
          <Text style={[styles.toggleText, {fontFamily: Fonts.RobotoRegular}]}>
            Is Auto Hole Advance Working?
          </Text>
          <Switch
            style={{marginRight: 10}}
            value={enableHole}
            onPress={() => setEnableHole(!enableHole)}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectSpecificHole')}
          style={styles.cardToggle}>
          <Text style={[styles.toggleText, {fontFamily: Fonts.RobotoRegular}]}>
            Select Specific Holes
          </Text>
          <Image
            style={{height: 20, width: 20, marginRight: 22}}
            source={Icons.front}
          />
        </TouchableOpacity>
        <Text style={[styles.textArea, {fontFamily: Fonts.RobotoRegular}]}>
          Do You Have Any Additional Notes Or Details?
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          value={query}
          onChangeText={val => setQuery(val)}
          textAlignVertical="top"
        />

        <Button
          backgroundColor={Colors.bgColor}
          title={'CANCEL'}
          marginTop={normalize(20)}
          textColor={Colors.white}
          titlesingle={true}
          fontFamily={Fonts.RobotoMedium}
          fontSize={normalize(16)}
          fontWeight="500"
          borderColor={Colors.white}
          borderWidth={1}
          letterSpacing={2}
          onPress={() => navigation.goBack()}
          //   isightsideImage={true}
          //   rightimg={Icons.downarrow}
        />
        <Button
          backgroundColor={Colors.yellow}
          title={'SUBMIT'}
          marginTop={normalize(20)}
          marginBottom={normalize(20)}
          textColor={Colors.black}
          titlesingle={true}
          fontFamily={Fonts.RobotoMedium}
          fontSize={normalize(16)}
          fontWeight="500"
          letterSpacing={2}
          onPress={() => submitReport()}
          //   isightsideImage={true}
          //   rightimg={Icons.downarrow}
        />
      </ScrollView>
    </SafeView>
  );
};
const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: Colors.black3,
    marginVertical: normalize(5),
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
  },
  title: {
    fontSize: normalize(12),
    color: Colors.white,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: normalize(10),
    textTransform: 'uppercase',
    letterSpacing: 4,
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
    marginLeft: 9,
  },
  cardToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(19),
    borderBottomColor: Colors.black3,
    borderBottomWidth: 2,
  },
  toggleText: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  input: {
    height: 191,
    padding: normalize(10),
    backgroundColor: Colors.bgColor,
    borderColor: Colors.black3,
    borderRadius: 13,
    width: '100%',
    color: Colors.white,
    borderWidth: 3,
    fontFamily: Fonts.RobotoRegular,
  },
  textArea: {
    color: Colors.white,
    marginTop: normalize(24),
    marginBottom: normalize(26),
    fontSize: normalize(14),
  },
  secondary: {
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 5,
    height: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(36),
  },
  secBtn: {
    fontSize: normalize(15),
    color: Colors.white,
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontWeight: '600',
  },
  primary: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    height: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(24),
    marginBottom: normalize(31),
  },
  primaryBtn: {
    fontSize: normalize(15),
    color: Colors.black,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
});
export default ReportIssueScreen;
