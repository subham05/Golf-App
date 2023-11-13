//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import SafeView from '../../components/SafeView';
// create a component
const ScoreCards = ({navigation}) => {
  const data = [
    {
      id: 1,
      hole: '01',
      par: '04',
      si: '04',
      strokes: '06',
      unit: '+2',
      shape: 'square',
    },
    {
      id: 2,
      hole: '02',
      par: '04',
      si: '07',
      strokes: '05',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 3,
      hole: '03',
      par: '03',
      si: '02',
      strokes: '04',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 4,
      hole: '04',
      par: '05',
      si: '18',
      strokes: '05',
      unit: 'E',
    },
    {
      id: 5,
      hole: '05',
      par: '04',
      si: '1',
      strokes: '06',
      unit: '+2',
      shape: 'square',
    },
    {
      id: 6,
      hole: '06',
      par: '04',
      si: '12',
      strokes: '05',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 7,
      hole: '07',
      par: '04',
      si: '3',
      strokes: '03',
      unit: '-1',
      shape: 'borderCircle',
    },
    {
      id: 8,
      hole: '08',
      par: '03',
      si: '14',
      strokes: '04',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 9,
      hole: '09',
      par: '05',
      si: '8',
      strokes: '06',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 10,
      hole: 'Out',
      par: '36',
      si: '8',
      strokes: '44',
      unit: '+8',
    },
    {
      id: 11,
      hole: '10',
      par: '4',
      si: '5',
      strokes: '7',
      unit: '+3',
      shape: 'square',
    },
    {
      id: 12,
      hole: '11',
      par: '4',
      si: '13',
      strokes: '4',
      unit: 'E',
    },
    {
      id: 13,
      hole: '12',
      par: '03',
      si: '17',
      strokes: '03',
      unit: 'E',
    },
    {
      id: 14,
      hole: '13',
      par: '05',
      si: '09',
      strokes: '06',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 15,
      hole: '14',
      par: '04',
      si: '06',
      strokes: '02',
      unit: '+2',
      shape: 'square',
    },
    {
      id: 16,
      hole: '15',
      par: '04',
      si: '10',
      strokes: '04',
      unit: 'E',
    },
    {
      id: 17,
      hole: '16',
      par: '04',
      si: '16',
      strokes: '04',
      unit: 'E',
    },
    {
      id: 18,
      hole: ' 17',
      par: '05',
      si: '15',
      strokes: '04',
      unit: '+1',
      shape: 'borderSquare',
    },
    {
      id: 19,
      hole: '18',
      par: '05',
      si: '11',
      strokes: '05',
      unit: 'E',
    },
    {
      id: 20,
      hole: 'Gross',
      par: 'Par',
      si: '',
      strokes: 'Strokes',
      unit: 'Pts',
    },
    {
      id: 21,
      hole: 'In',
      par: '36',
      si: '',
      strokes: ' 43',
      unit: '+7',
    },
    {
      id: 22,
      hole: 'Out',
      par: '36',
      si: '',
      strokes: '44',
      unit: '+8',
    },
    {
      id: 23,
      hole: 'Gross',
      par: 'Par',
      si: '',
      strokes: 'Strokes',
      unit: '+/-',
    },
    {
      id: 24,
      hole: 'Total',
      par: '90',
      si: '',
      strokes: '87',
      unit: '-3',
    },

    {
      id: 25,
      hole: 'Nett',
      par: 'Par',
      si: '',
      strokes: '87',
      unit: '-3',
    },
    {
      id: 26,
      hole: 'Total',
      par: '90',
      si: '',
      strokes: '87',
      unit: '-3',
    },
  ];

  const renderData = ({item, index}) => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor:
              item.hole == 'Out' || item.hole == 'In'
                ? Colors.yellow
                : item.hole == 'Gross' || item.hole == 'Nett'
                ? Colors.green
                : item.id == 10
                ? Colors.primary
                : item.id % 2 == 0
                ? Colors.grey
                : Colors.white,
          },
        ]}>
        <View style={styles.valueView}>
          <Text
            style={[
              styles.chartTxt,
              {color: Colors.black, fontFamily: Fonts.RobotoRegular},
            ]}>
            {item.hole}
          </Text>
        </View>
        <View style={styles.valueView}>
          <Text
            style={[
              styles.chartTxt,
              {color: Colors.black, fontFamily: Fonts.RobotoRegular},
            ]}>
            {item.par}
          </Text>
        </View>
        <View style={styles.valueView}>
          <Text
            style={[
              styles.chartTxt,
              {color: Colors.red, fontFamily: Fonts.RobotoRegular},
            ]}>
            {item.si}
          </Text>
        </View>
        <View style={styles.valueView}>
          {item.shape == 'square' && (
            <View style={styles.square}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.white, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == 'borderSquare' && (
            <View style={styles.borderSquare}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.black, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == 'borderCircle' && (
            <View style={styles.borderCircle}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.black, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == undefined ? (
            <Text
              style={[
                styles.chartTxt,
                {color: Colors.black, fontFamily: Fonts.RobotoRegular},
              ]}>
              {item.strokes}
            </Text>
          ) : null}
        </View>
        <View style={styles.valueView}>
          <Text
            style={[
              styles.chartTxt,
              {color: Colors.black, fontFamily: Fonts.RobotoRegular},
            ]}>
            {item.unit}
          </Text>
        </View>
        <View style={styles.valueView}>
          {item.shape == 'square' && (
            <View style={styles.square}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.white, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == 'borderSquare' && (
            <View style={styles.borderSquare}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.black, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == 'borderCircle' && (
            <View style={styles.borderCircle}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.black, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == undefined ? (
            <Text
              style={[
                styles.chartTxt,
                {color: Colors.black, fontFamily: Fonts.RobotoRegular},
              ]}>
              {item.strokes}
            </Text>
          ) : null}
        </View>
        <View style={styles.valueView}>
          <Text
            style={[
              styles.chartTxt,
              {color: Colors.black, fontFamily: Fonts.RobotoRegular},
            ]}>
            {item.unit}
          </Text>
        </View>
        <View style={styles.valueView}>
          {item.shape == 'square' && (
            <View style={styles.square}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.white, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == 'borderSquare' && (
            <View style={styles.borderSquare}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.black, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == 'borderCircle' && (
            <View style={styles.borderCircle}>
              <Text
                style={[
                  styles.chartTxt,
                  {color: Colors.black, fontFamily: Fonts.RobotoRegular},
                ]}>
                {item.strokes}
              </Text>
            </View>
          )}
          {item.shape == undefined ? (
            <Text
              style={[
                styles.chartTxt,
                {color: Colors.black, fontFamily: Fonts.RobotoRegular},
              ]}>
              {item.strokes}
            </Text>
          ) : null}
        </View>
        <View style={styles.valueView}>
          <Text
            style={[
              styles.chartTxt,
              {color: Colors.black, fontFamily: Fonts.RobotoRegular},
            ]}>
            {item.unit}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <Text
          style={[
            styles.title,
            {fontFamily: Fonts.RobotoBold, letterSpacing: 2},
          ]}>
          SCORECARD 01
        </Text>
        <View style={styles.mainView}>
          <View
            style={{
              paddingHorizontal: normalize(9),
              flexGrow: 1,
              width: '100%',
            }}>
            <FlatList
              data={[1]}
              horizontal={true}
              style={{flex: 1}}
              renderItem={() => (
                <FlatList
                  data={data}
                  stickyHeaderIndices={[0]}
                  ListHeaderComponent={() => (
                    <View style={{backgroundColor: Colors.bgColor}}>
                      <View style={styles.headRow}>
                        <Text
                          style={[
                            styles.park,
                            {fontFamily: Fonts.RobotoMedium},
                          ]}>
                          Yurassic park
                        </Text>
                        <View style={styles.mainRow}>
                          <View style={styles.innerRow}>
                            <Image
                              source={Icons.flag}
                              style={styles.calendar}
                            />
                            <Text
                              style={[
                                styles.date,
                                {fontFamily: Fonts.RobotoRegular},
                              ]}>
                              Kharkiv, Kharkivs’ka oblast, 0.3 miles
                            </Text>
                          </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.mainRow}>
                          <View style={styles.innerRow}>
                            <Image
                              source={Icons.calendar}
                              style={styles.calendar}
                            />
                            <Text
                              style={[
                                styles.date,
                                {fontFamily: Fonts.RobotoRegular},
                              ]}>
                              07 Dec 2022
                            </Text>
                          </View>
                          <View style={styles.innerRow}>
                            <Image
                              source={Icons.clock}
                              style={styles.calendar}
                            />
                            <Text
                              style={[
                                styles.date,
                                {fontFamily: Fonts.RobotoRegular},
                              ]}>
                              8:45am
                            </Text>
                          </View>
                          <Text style={styles.value}>+15</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.mainRow}>
                          <Text
                            style={[
                              styles.subTxt,
                              {fontFamily: Fonts.RobotoBold},
                            ]}>
                            John Morrison
                          </Text>
                          <Text
                            style={[
                              styles.subTxt,
                              {fontFamily: Fonts.RobotoBold},
                            ]}>
                            HCP : 18
                          </Text>
                        </View>
                      </View>
                      <View style={styles.header}>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            Hole
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            Par
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            Si
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            Strokes
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            +/-
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            Strokes
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            +/-
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            Strokes
                          </Text>
                        </View>
                        <View style={styles.valueView}>
                          <Text
                            style={[
                              styles.chartTxt,
                              {
                                color: Colors.white,
                                fontFamily: Fonts.RobotoRegular,
                              },
                            ]}>
                            +/-
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderData}
                  keyExtractor={(item, index) => item.id}
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RoundStats');
            }}
            style={styles.button}>
            <Text
              style={[
                styles.buttonTxt,
                {fontFamily: Fonts.RobotoMedium, letterSpacing: 2},
              ]}>
              ROUND STATS
            </Text>
          </TouchableOpacity>
        </View>
      </SafeView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  navBar: {
    // height: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  back: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  mainView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    height: 31.4,
    width: 150,
    resizeMode: 'contain',
  },
  headRow: {
    width: '100%',
    paddingVertical: 25,
    marginBottom: normalize(15),
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.black2,
    borderRadius: 7,
  },
  mainRow: {
    width: '95%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  separator: {
    width: '90%',
    borderTopWidth: 1,
    borderTopColor: Colors.black2,
    marginVertical: 5,
    alignSelf: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  date: {
    fontSize: 13,
    color: Colors.white,
  },
  title: {
    fontSize: 15,
    color: Colors.white,
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  name: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: Colors.primary,
    // fontWeight: 'bold',
    fontFamily: Fonts.RobotoRegular,
  },
  calendar: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  park: {
    fontSize: 16,
    color: Colors.primary,
    // fontWeight: 'bold',
    marginLeft: 20,
  },

  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.green,
    borderRadius: 5,
    marginBottom: 5,
  },
  subTxt: {
    fontSize: 16,
    color: Colors.white,
    // fontWeight: 'bold',
  },
  chartTxt: {
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    width: '95%',
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  buttonTxt: {color: Colors.black, fontSize: 15, fontWeight: '600'},
  borderSquare: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  borderCircle: {
    height: 30,
    width: 30,
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    backgroundColor: Colors.darkGrey,
    padding: 5,
    borderRadius: 5,
  },
  valueView: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',

    // borderWidth:1
  },
});

//make this component available to the app
export default ScoreCards;
