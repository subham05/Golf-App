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
import React, {useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {setSelectedHole} from '../../redux/Reducer/GolfCourseReducer';
import _ from 'lodash';
import SafeView from '../../components/SafeView';

const SelectSpecificHole = ({navigation}) => {
  const GolfCourseReducer = useSelector(state => state.GolfCourseReducer);
  const [select, setselect] = useState(false);
  // console.log('Select', select);
  const [Data, setdata] = useState([]);
  // console.log('Data', Data);
  const [selectCount, setSelectCount] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    createHoles(
      GolfCourseReducer?.numberHoles,
      GolfCourseReducer?.selectedHoleData,
    );
  }, []);

  function mergeUniquely(arr1, arr2) {
    let arr = arr1;
    arr.map(item => {
      item.active = arr2.some(it => it == item?.hole);
    });
    setselect(_.isEmpty(arr.filter(item => item.active === false)));
    // console.log('STATUS SHOWN: ', _.isEmpty(arr.filter(item => item.active === false)));
    // console.log('IMP ARRAY: ', arr);
    return arr;
  }

  const createHoles = (totalHole, selectedHoles) => {
    let arr = [];
    for (let index = 0; index < totalHole; index++) {
      arr.push({
        number:
          index < 9
            ? '0' + JSON.stringify(index + 1)
            : JSON.stringify(index + 1),
        hole: index + 1,
        active: false,
      });
    }
    // console.log('Arr', arr);
    if (!_.isEmpty(selectedHoles)) {
      setdata(mergeUniquely(arr, selectedHoles));
    } else {
      setdata(arr);
    }
  };

  // useEffect(() => {
  //   checkSelectedHoles();
  // }, [Data]);
  const checkSelectedHoles = data => {
    let newRr = [];

    let d = data.filter(item => item.active == true);
    // console.log('DDD', d);

    if (!_.isEmpty(d)) {
      for (let i = 0; i < d.length; i++) {
        newRr.push(d[i]?.hole);
      }
    }
    dispatch(setSelectedHole(newRr));
  };

  function selectfunction(index) {
    // console.log('index : ', index);

    let arr = [...Data];
    arr[index].active = !arr[index].active;
    setdata(arr);
    setselect(_.isEmpty(arr.filter(item => item.active === false)));
    checkSelectedHoles(arr);
  }

  function selectall(index) {
    let arr = [...Data];
    arr.map(item => {
      item.active = index;
    });
    setdata(arr);
    checkSelectedHoles(arr);
  }

  return (
      <SafeView style={{backgroundColor: Colors.bgColor, flex: 1}}>
      <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <ScrollView style={{paddingHorizontal: 15}}>
          <Text style={[styles.title, {fontFamily: Fonts.RobotoBold}]}>
            Select Specific Holes
          </Text>
          <View style={styles.separator} />
          <View style={styles.check}>
            <TouchableOpacity
              onPress={() => {
                select == true
                  ? (setselect(false), selectall(false))
                  : (setselect(true), selectall(true));
              }}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                borderWidth: 1,
                borderColor: Colors.yellow,
                borderRadius: normalize(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {select && (
                <Image
                  source={Icons.tick}
                  style={{
                    width: normalize(6),
                    height: normalize(6),
                    resizeMode: 'stretch',
                  }}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Select All</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {Data.map((item, index) => (
              <TouchableOpacity
                onPress={() => selectfunction(index)}
                key={index}
                style={{
                  height: 96,
                  width: '31%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.greyMedium,
                  borderRadius: 10,
                  marginVertical: 6,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    // fontWeight: 'bold',
                    fontFamily:Fonts.RobotoRegular,
                    color: item.active === true ? Colors.primary : Colors.white,
                  }}>
                  {item?.number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeView>
  );
};
const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Colors.greyDark,
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
    fontSize: normalize(15),
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
    marginLeft: normalize(9),
  },
  cardToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(19),
    borderBottomColor: Colors.greyDark,
    borderBottomWidth: 1,
  },
  toggleText: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  input: {
    height: normalize(191),
    backgroundColor: Colors.bgColor,
    borderColor: Colors.greyMedium,
    borderRadius: normalize(13),
    borderWidth: 1,
  },
  textArea: {
    color: Colors.white,
    marginTop: normalize(24),
    marginBottom: normalize(26),
    fontSize: normalize(14),
  },
  check: {flexDirection: 'row', alignItems: 'center', marginVertical: 12},
  checkText: {
    color: Colors.white,
    fontSize: normalize(14),
    marginLeft: normalize(12),
    fontFamily: Fonts.RobotoRegular,
  },
});
export default SelectSpecificHole;
