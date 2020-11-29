import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setDefaultState, setIsAppLoaded} from './redux/actions/actions';
import {AppState} from 'react-native';
import {SCREEN} from './Constants';
import {
  Contact,
  Error,
  Giving,
  Home,
  Search,
  Splash,
  WatchLive,
} from './Screens';
import * as Remote from './Controllers/Remote';
import * as Feed from './Controllers/Feed';

const App = (props) => {
  const restartApp = () => {
    props.setDefaultState();
    props.setIsAppLoaded(true);
    Feed.get();
  };

  const renderScreen = () => {
    switch (props.screen) {
      case SCREEN.SPLASH:
        return <Splash />;
      case SCREEN.SERMONS:
        return <Home />;
      case SCREEN.ERROR:
        return <Error restartApp={restartApp} />;
      case SCREEN.CONTACT:
        return <Contact />;
      case SCREEN.GIVING:
        return <Giving />;
      case SCREEN.WATCHLIVE:
        return <WatchLive />;
      case SCREEN.SEARCH:
        return <Search />;
      default:
        console.error(
          `[App.js][renderScreen] Screen not found! ${props.screen}`,
        );
        break;
    }
  };

  useEffect(() => {
    if (!props.isFeedReady) {
      Feed.get();
      Remote.enable();
      AppState.addEventListener('change', (appState) => {
        appState === 'active' && restartApp();
      });
    }
  });

  return renderScreen();
};

const mapState = (state) => {
  return {
    isFeedReady: state.isFeedReady,
    screen: state.screen,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setDefaultState: () => dispatch(setDefaultState()),
    setIsAppLoaded: (isAppLoaded) => dispatch(setIsAppLoaded(isAppLoaded)),
  };
};

export default connect(mapState, mapDispatch)(App);
