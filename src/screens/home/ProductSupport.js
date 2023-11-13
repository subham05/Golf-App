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
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {faqRequest} from '../../redux/Reducer/HomeReducer';
import SafeView from '../../components/SafeView';
const ProductSupport = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(faqRequest());
  }, []);
  return (
      <SafeView style={{backgroundColor: Colors.bgColor, flex: 1}}>
      <MyStatusBar backgroundColor={Colors.bgColor} />
        <Header />
        <ScrollView style={{paddingHorizontal: 15}}>
          <Text style={[styles.title, {fontFamily:Fonts.RobotoRegular}]}>Product support</Text>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => navigation.navigate('TechnicalSupport')}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.technical} />
              <Text style={styles.textMenu}>Technical Support</Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.front} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportCard}
          onPress={()=> Linking.openURL('https://www.powakaddy.com/')}
          >
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.powakaddy} />
              <Text style={styles.textMenu}>PowaKaddy Website</Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.LinkIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => Linking.openURL('https://www.powakaddy.com/faqs-and-technical/')}>
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.faq} />
              <Text style={styles.textMenu}>FAQ's</Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.LinkIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportCard}
          onPress={()=> Linking.openURL('https://www.powakaddy.com/manuals-and-instructions/')}
          >
            <View style={styles.row}>
              <Image style={styles.Icon} source={Icons.usermanual} />
              <Text style={styles.textMenu}>User Manuals</Text>
            </View>
            <Image style={styles.FrontImg} source={Icons.LinkIcon} />
          </TouchableOpacity>
        </ScrollView>
      </SafeView>
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
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(10),
    borderBottomColor: Colors.greyDark,
    borderBottomWidth: 1,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  Icon: {
    height: 40,
    width: 40,
    // resizeMode: 'stretch',
  },
  textMenu: {
    fontSize: normalize(13),
    color: Colors.white,
    marginLeft: normalize(21),
    fontFamily:Fonts.RobotoLight
  },
  FrontImg: {
    height: 25,
    width: 25,
  },
});
export default ProductSupport;
