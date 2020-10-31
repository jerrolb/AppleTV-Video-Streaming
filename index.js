/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './js/redux/store/index';

AppRegistry.registerComponent(appName, () => appWithProvider);

class appWithProvider extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
};
