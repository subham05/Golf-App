import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import SafeView from '../../components/SafeView';

let realm = new Realm({path: 'Powakaddy.realm'});

const SupportScreen = ({navigation}) => {
  var device_all = realm.objects('bluetooth_devices');
  let deviceObj = JSON.parse(JSON.stringify(device_all));
  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <ScrollView style={{paddingHorizontal: 15}}>
          <Text
            style={[
              styles.title,
              {fontFamily: Fonts.RobotoRegular, letterSpacing: 3},
            ]}>
            SUPPORT
          </Text>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('MyDevice')}
            //MyDevice
            style={styles.supportCard}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Connect} />
              <Text style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                Connect To Product
              </Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.front} />
          </TouchableOpacity>
          {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
            <View></View>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Newfirmwireupdate')}
              style={styles.supportCard}>
              <View style={styles.row}>
                <Image style={styles.Icon} source={Icons.Update} />
                <Text
                  style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                  Update
                </Text>
              </View>
              <Image style={styles.FrontImg} source={Icons.front} />
            </TouchableOpacity>
          )}
          {deviceObj[0]?.bluetoothName !== 'POWAKADDY [035]' ? (
            <View></View>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Notificaions')}
              style={styles.supportCard}>
              <View style={styles.row}>
                <Image style={styles.Icon} source={Icons.Update} />
                <Text
                  style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                  Notifications
                </Text>
              </View>
              <Image style={styles.FrontImg} source={Icons.front} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => navigation.navigate('ReportMappingScreen')}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Report} />
              <Text style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                Report Mapping Issue
              </Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.front} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => navigation.navigate('WarrantyRegister')}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Warranty} />
              <Text style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                Warranty Registration
              </Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.front} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => navigation.navigate('ProductSupport')}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Product} />
              <Text style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                Product Support
              </Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.front} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.Privacy} />
              <Text style={[styles.textMenu, {fontFamily: Fonts.RobotoLight}]}>
                Privacy Policy
              </Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.front} />
          </TouchableOpacity>
        </ScrollView>
      </SafeView>
    </>
  );
};
const styles = StyleSheet.create({
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(10),
    borderBottomColor: Colors.greyDark,
    borderBottomWidth: 1,
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
  },
  Icon: {
    height: normalize(30),
    width: normalize(30),
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  textMenu: {
    fontSize: normalize(13),
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
});
export default SupportScreen;
