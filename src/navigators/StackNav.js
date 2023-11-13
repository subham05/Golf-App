import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splashScreen/Splash';
import Connecttoyou from '../screens/home/Connecttoyou';
import Selectgpsversion from '../screens/home/Selectgpsversion';
import Successfulpaired from '../screens/home/Successfulpaired';
import Home from '../screens/home/Home';
import {useState} from 'react';
import ScoreCards from '../screens/home/ScoreCards';
import RoundStats from '../screens/home/RoundStats';
import CourseSearch from '../screens/home/CourseSearch';
import Rounds from '../screens/home/Rounds';
import SupportScreen from '../screens/home/SupportScreen';
import MyDevice from '../screens/home/Mydevice';
import Newfirmwireupdate from '../screens/home/Newfirmwireupdate';
import Updatingfirmware from '../screens/home/Updatingfirmware';
import Searching from '../screens/home/Searching';
import UpdatingCourse from '../screens/home/UpdatingCourse';
import Notificaions from '../screens/home/Notifications';
import ReportMappingScreen from '../screens/home/ReportMappingScreen';
import ReportIssueScreen from '../screens/home/ReportIssueScreen';
import SelectSpecificHole from '../screens/home/SelectSpecificHole';
import PrivacyPolicy from '../screens/home/PrivacyPolicy';
import WarrantyRegister from '../screens/home/WarrantyRegister';
import ProductSupport from '../screens/home/ProductSupport';
import TechnicalSupport from '../screens/home/TechnicalSupport';
import Firmwareupdatesuccessfully from '../screens/home/Firmwareupdatesuccessfully';
import Connecttoproduct from '../screens/home/Connecttoproduct';
import Faq from '../screens/home/Faq';
import UserManual from '../screens/home/UserManual';
import Signin from '../screens/auth/Signin';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Signup from '../screens/auth/Signup';
import MyAccount from '../screens/home/MyAccount';
import ChangeLoginDetails from '../screens/home/ChangeLoginDetails';
import ChangePassword from '../screens/home/ChangePassword';
import ChangeEmail from '../screens/home/ChangeEmail';
import CourseUpdateProcess from '../screens/home/CourseUpdateProcess';
import NotPairedDevice from '../screens/home/NotPairedDevice';
import EditClub from '../screens/home/EditClub';

export default function StackNav() {
  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log(AuthReducer?.getTokenResponse);
  const Stack = createStackNavigator();

  const [splashShow, setSplashShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setSplashShow(true);
    }, 2000);
  }, []);
  const Screens = {
    Splash: Splash,
    Signin: Signin,
    ForgotPassword: ForgotPassword,
    Signup: Signup,
    Connecttoyou: Connecttoyou,
    Searching: Searching,
    Selectgpsversion: Selectgpsversion,
    Successfulpaired: Successfulpaired,
    Home: Home,
    MyAccount: MyAccount,
    ScoreCards: ScoreCards,
    RoundStats: RoundStats,
    CourseSearch: CourseSearch,
    NotPairedDevice: NotPairedDevice,
    CourseUpdateProcess: CourseUpdateProcess,
    Rounds: Rounds,
    SupportScreen: SupportScreen,
    MyDevice: MyDevice,
    Newfirmwireupdate: Newfirmwireupdate,
    Updatingfirmware: Updatingfirmware,
    UpdatingCourse: UpdatingCourse,
    Notificaions: Notificaions,
    ReportMappingScreen: ReportMappingScreen,
    ReportIssueScreen: ReportIssueScreen,
    SelectSpecificHole: SelectSpecificHole,
    PrivacyPolicy: PrivacyPolicy,
    WarrantyRegister: WarrantyRegister,
    ProductSupport: ProductSupport,
    TechnicalSupport: TechnicalSupport,
    Firmwareupdatesuccessfully: Firmwareupdatesuccessfully,
    Connecttoproduct: Connecttoproduct,
    Faq: Faq,
    UserManual: UserManual,
    ChangeLoginDetails: ChangeLoginDetails,
    ChangePassword: ChangePassword,
    ChangeEmail: ChangeEmail,
    EditClub: EditClub,
  };

  return (
    <NavigationContainer
      theme={{
        colors: '#000',
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => {
          return (
            <Stack.Screen
              name={name}
              component={component}
              key={name}
              options={{animation: 'slide_from_right'}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // }
}
