import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import SafeView from '../../components/SafeView';
import Switch from '../../components/Switch';
import Button from '../../components/Button';
const EditClub = ({navigation}) => {
  const [enable, setEnable] = useState(false);
  const [yts, setYts] = useState('');
  const [modalview, setmodal] = useState(false);

  return (
    <>
      <SafeView>
        <MyStatusBar backgroundColor={Colors.bgColor} />

        <Header />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={{paddingHorizontal: 15}}>
            <Text style={[styles.title, {fontFamily: Fonts.RobotoRegular}]}>
              Virtual bag
            </Text>
            <View style={styles.separator} />
            <Text style={styles.firstHead}>Edit Club</Text>
            <TouchableOpacity style={styles.buttonNew}>
              <Text style={styles.newText}>Ver</Text>
              <Image
                style={styles.newImg}
                resizeMode="contain"
                source={Icons.RightArrow}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                backgroundColor: Colors.bgColor,
                height: normalize(50),
                borderRadius: normalize(10),
                borderWidth: 1,
                borderColor: Colors.white,
                marginBottom: normalize(6),
                paddingHorizontal: normalize(16),
              }}
              value={yts}
              onChangeText={text => setYts(text)}
              placeholder="Yts"
              placeholderTextColor={Colors.white}
              selectionColor={Colors.yellow}
              keyboardType="number-pad"
            />
            <View style={styles.buttonNew}>
              <Text style={styles.newText}>Jve</Text>
              <Switch
                textTrue={'ON'}
                textFalse={'OFF'}
                //   style={{marginRight: 10}}
                value={enable}
                onPress={() => setEnable(!enable)}
              />
            </View>
            <TouchableOpacity
              onPress={() => setmodal(true)}
              style={styles.buttonNew}>
              <Text style={styles.newText}>Delete Club</Text>
              <Image
                style={styles.newImg}
                resizeMode="contain"
                source={Icons.delete1}
              />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

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
              Do you really want to delete the Club?
            </Text>
            <Text
              style={{
                color: '#929292',
                fontFamily: Fonts.RobotoLight,
                fontSize: normalize(11),
                marginTop: normalize(5),
                textAlign: 'center',
                textTransform: 'capitalize',
                lineHeight: normalize(20),
              }}>
              This Process Cannot Be Undone
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
  row: {flexDirection: 'row'},
  separator: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: Colors.yellow,
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
  accordianText: {
    fontSize: normalize(13),
    color: Colors.white,
    marginLeft: normalize(7),
    width: '80%',
    fontFamily: Fonts.RobotoRegular,
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
  firstHead: {
    color: Colors.yellow,
    lineHeight: normalize(24),
    fontFamily: Fonts.RobotoBold,
    fontSize: normalize(14),
    marginBottom: normalize(12),
    marginTop: normalize(6),
  },
  lightText: {
    fontSize: normalize(11),
    color: Colors.lightGrey,
    marginBottom: normalize(12),
    lineHeight: normalize(21),
    fontFamily: Fonts.RobotoRegular,
  },
  accordianView: {
    marginVertical: normalize(14),
    paddingTop: normalize(20),
    borderTopWidth: 1,
    borderTopColor: Colors.greyDark,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: normalize(7),
  },
  accordianHead: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  buttonNew: {
    backgroundColor: Colors.background,
    borderRadius: normalize(10),
    height: normalize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    marginBottom: normalize(6),
  },
  newText: {
    color: Colors.white,
    fontFamily: Fonts.RobotoMedium,
    fontSize: normalize(14),
  },
  newImg: {
    height: normalize(16),
    width: normalize(16),
  },
});
export default EditClub;
