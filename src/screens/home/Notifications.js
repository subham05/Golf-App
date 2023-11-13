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
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import Switch from '../../components/Switch';
import SafeView from '../../components/SafeView';
const Notificaions = ({navigation}) => {
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableCall, setEnableCall] = useState(false);
  const [enableSms, setEnableSms] = useState(false);
  return (
    <>
      <SafeView>
      <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <ScrollView style={{paddingHorizontal: 15}}>
          <Text style={[styles.title,{fontFamily:Fonts.RobotoRegular}]}>notifications</Text>
          <View style={styles.separator} />
          <View style={styles.cardToggle}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Connect} />
              <Text
                style={[styles.toggleText, {fontFamily: Fonts.RobotoLight}]}>
                Calls
              </Text>
            </View>

            <Switch
              textTrue={'ON'}
              textFalse={'OFF'}
              style={{marginRight: 10}}
              value={enableCall}
              onPress={() => setEnableCall(!enableCall)}
            />
          </View>
          <View style={styles.cardToggle}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Report} />
              <Text
                style={[styles.toggleText, {fontFamily: Fonts.RobotoLight}]}>
                SMS
              </Text>
            </View>
            <Switch
              textTrue={'ON'}
              textFalse={'OFF'}
              style={{marginRight: 10}}
              value={enableSms}
              onPress={() => setEnableSms(!enableSms)}
            />
          </View>
          <View style={styles.cardToggle}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Warranty} />
              <Text
                style={[styles.toggleText, {fontFamily: Fonts.RobotoLight}]}>
                Email
              </Text>
            </View>
            <Switch
              textTrue={'ON'}
              textFalse={'OFF'}
              style={{marginRight: 10}}
              value={enableEmail}
              onPress={() => setEnableEmail(!enableEmail)}
            />
          </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    height: normalize(30),
    width: normalize(30),
    resizeMode: 'contain',
    marginRight: normalize(16),
  },
});
export default Notificaions;
