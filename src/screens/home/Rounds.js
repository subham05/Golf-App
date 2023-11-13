import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/dimen';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import Header from '../../components/Header';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import SafeView from '../../components/SafeView';
// create a component
const Rounds = ({navigation}) => {
  const [modalview, setmodal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const Scorecard = ({index}) => {
    return (
      <View style={styles.scoreCard} key={index}>
        <View style={styles.cardRow}>
          <Text style={styles.cardName}>Scorecard 01</Text>
          <TouchableOpacity onPress={() => setmodal(true)}>
            <Image source={Icons.delete1} style={styles.delete} />
          </TouchableOpacity>
        </View>
        <View style={[styles.separator, {width: '100%'}]} />
        <View>
          <Text style={[styles.park, {fontFamily: Fonts.RobotoRegular}]}>
            Yurassic park
          </Text>
          <View style={styles.cardRow}>
            <View style={styles.innerRow}>
              <Image source={Icons.flag} style={styles.calendar} />
              <Text style={[styles.date, {fontFamily: Fonts.RobotoRegular}]}>
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
              <Text style={[styles.date, {fontFamily: Fonts.RobotoRegular}]}>
                07 Dec 2022
              </Text>
            </View>
            <View style={styles.innerRow}>
              <Image
                source={Icons.clock}
                style={[styles.calendar, {marginRight: 10}]}
              />
              <Text style={[styles.date, {fontFamily: Fonts.RobotoRegular}]}>
                8:45am
              </Text>
            </View>
          </View>
          <View style={[styles.separator, {width: '100%'}]} />
          <View style={styles.scoreRow}>
            <View style={styles.innerRow}>
              <Text style={[styles.key, {fontFamily: Fonts.RobotoRegular}]}>
                Gross score :
              </Text>
              <Text style={styles.value}> 10</Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={[styles.key, {fontFamily: Fonts.RobotoRegular}]}>
                Net score :
              </Text>
              <Text style={styles.value}> 5</Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={[styles.key, {fontFamily: Fonts.RobotoRegular}]}>
                Points :
              </Text>
              <Text style={styles.value}> 5</Text>
            </View>
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
                fontFamily: Fonts.RobotoBold,
                letterSpacing: 2,
                textTransform: 'uppercase',
              },
            ]}>
            View Scorecard
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeView>
      <MyStatusBar backgroundColor={Colors.bgColor} />
      <Header />
      <View style={{backgroundColor: Colors.bgColor}}>
        <Text
          style={[
            styles.title,
            {fontFamily: Fonts.RobotoRegular, letterSpacing: 4},
          ]}>
          ROUNDS
        </Text>
        <View style={styles.mainRow}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.borderRow}>
            <View style={styles.innerRow}>
              <Image source={Icons.calendar} style={styles.calendar} />
              <Text style={[styles.date, {fontFamily: Fonts.RobotoMedium}]}>
                {moment(date).format('DD MMM YYYY')}
              </Text>
            </View>
            <Image
              source={Icons.back}
              style={[styles.calendar, {transform: [{rotate: '-90deg'}]}]}
            />
          </TouchableOpacity>
          <View style={styles.borderRow}>
            <View style={styles.innerRow}>
              {/* <Image source={Icons.clock} style={styles.calendar} /> */}
              <Text style={[styles.date, {fontFamily: Fonts.RobotoMedium}]}>
                Score
              </Text>
            </View>
            <Image
              source={Icons.back}
              style={[styles.calendar, {transform: [{rotate: '-90deg'}]}]}
            />
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: normalize(10),
        }}
        data={[1, 1, 1]}
        renderItem={({item, index}) => <Scorecard index={index} />}
        keyExtractor={index => index}
      />
      <ScrollView>
        <Modal
          // transparent={true}
          isVisible={modalview}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackButtonPress={() => setmodal(false)}
          onBackdropPress={() => setmodal(false)}
          animationType={'fade'}
          // backdropOpacity={0.2}
          // transparent={true}
          // backdropColor="rgba(0,0,0,0.5)"
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            margin: 0,
            // backgroundColor: 'black',
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
              Do you really want to delete these Scorecard? this Process cannot
              be undone
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
              onPress={() => setmodal(false)}
            />
          </View>
        </Modal>
      </ScrollView>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        theme="dark"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </SafeView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    alignItems: 'center',
  },
  logo: {
    height: 31.4,
    width: 150,
    resizeMode: 'contain',
  },

  separator: {
    width: '90%',
    borderTopWidth: 1,
    borderTopColor: '#282727',
    // borderTopColor: Colors.black2,
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
    marginLeft: 5,
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
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts.RobotoRegular,
    marginTop: 2,
  },
  calendar: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
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
  borderRow: {
    borderWidth: 1,
    borderRadius: 6,
    width: '49%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    borderColor: Colors.white,
    padding: 10,
  },
  scoreCard: {
    borderWidth: 1,
    borderRadius: 13,
    width: '95%',
    justifyContent: 'center',
    alignItem: 'center',
    borderColor: Colors.yellow,
    padding: 15,
    marginTop: 10,
    alignSelf: 'center',
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
    fontFamily: Fonts.RobotoMedium,
  },
  delete: {
    height: 22,
    width: 22,
    marginTop: 3,
    resizeMode: 'contain',
  },
  park: {
    fontSize: 16,
    color: Colors.primary,
    // fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTxt: {color: Colors.black, fontSize: 15, fontWeight: '600'},
  scoreRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    marginVertical: 10,
  },
  key: {
    color: Colors.white,
    fontSize: 12,
    // fontWeight: '400',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default Rounds;
