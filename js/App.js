import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  setDefaultState,
  setIsAppLoaded,
  setAppStartTime,
} from './redux/actions/actions';
import {AppState} from 'react-native';
import {SCREEN} from './Constants';
import {
  Contact,
  Debug,
  Error,
  Giving,
  Sermons,
  Search,
  Splash,
  WatchLive,
} from './screens';
import * as Remote from './controllers/Remote';
import * as Feed from './controllers/Feed';
import * as Metrics from './controllers/Metrics';

const App = (props) => {
  const currAppState = useRef(AppState.currentState);
  const handleAppStateChanged = (nextAppState) => {
    currAppState.current === 'active' &&
    ['inactive', 'background'].includes(nextAppState) &&
    Metrics.recordSession();

    nextAppState === 'active' &&
    ['inactive', 'background'].includes(currAppState.current) &&
    props.setAppStartTime(Date.now());

    currAppState.current = nextAppState;
  };

  const renderScreen = () => {
    switch (props.screen) {
      case SCREEN.SPLASH:
        return <Splash />;
      case SCREEN.SERMONS:
        return <Sermons />;
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
      case SCREEN.DEBUG:
        return <Debug />;
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
      props.setAppStartTime(Date.now());
    }
    AppState.addEventListener('change', handleAppStateChanged);
    return () => {
      AppState.removeEventListener('change', handleAppStateChanged);
    };
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
    setAppStartTime: (appStartTime) => dispatch(setAppStartTime(appStartTime)),
  };
};

export default connect(mapState, mapDispatch)(App);
