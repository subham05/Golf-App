import React, {useContext, useEffect, useState} from 'react';
import {View, LogBox} from 'react-native';
import StackNav from './src/navigators/StackNav';
import BleBoundary, {BleContext} from './src/utils/helpers/BleBoundary';
import Realm from 'realm';
LogBox.ignoreAllLogs();
import {Provider, useDispatch} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {getTokenRequest} from './src/redux/Reducer/AuthReducer';
export default function App() {
  const dispatch = useDispatch();

  var realm;
  const context = useContext(BleContext);

  // CREATE LOCAL DATABASE
  useEffect(() => {
    dispatch(getTokenRequest());
    realm = new Realm({
      path: 'Powakaddy.realm',
      schema: [
        {
          name: 'bluetooth_devices',
          properties: {
            bluetoothName: 'string',
            serial_number: 'string',
            id: 'string',
            status: 'bool',
            auto_advance: 'bool',
            callNotifiy: 'bool',
            textNotifiy: 'bool',
            textBodyNotifiy: 'bool',
            emailNotifiy: 'bool',
            mtu: 'string',
            bytes: 'string',
            gender: 'string',
            courseCount: 'string',
            deviceVersion: 'string',
          },
        }
      ],
    });

    setTimeout(() => {
      // remove all auto connect object ( id & name )
      context.updateDetails();
    }, 1500);
    SplashScreen.hide();
  }, []);

  return <StackNav />;
}
