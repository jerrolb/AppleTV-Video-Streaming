import React from 'react';
import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './js/redux/store/index';

AppRegistry.registerComponent(appName, () => appWithProvider);

const appWithProvider = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
};
