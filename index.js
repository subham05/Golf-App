/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import BleBoundary from './src/utils/helpers/BleBoundary';
LogBox.ignoreAllLogs();

const Powakaddy = () => {
  return (
    <Provider store={store}>
      <BleBoundary>
        <App />
      </BleBoundary>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Powakaddy);
