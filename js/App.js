import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {setDefaultState, setIsAppLoaded} from './redux/actions/actions';
import {AppState} from 'react-native';
import {SCREEN} from './Constants';
import {
  Contact,
  Error,
  Giving,
  Sermons,
  Search,
  Splash,
  WatchLive,
} from './screens';
import * as Remote from './controllers/Remote';
import * as Feed from './controllers/Feed';

const App = (props) => {
  const currAppState = useRef(AppState.currentState);
  const handleAppStateChanged = (nextAppState) => {
    ['inactive', 'background'].includes(currAppState.current) &&
    nextAppState === 'active' && restartApp();

    currAppState.current = nextAppState;
  };
  const restartApp = () => {
    props.setDefaultState();
    Feed.get();
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
  };
};

export default connect(mapState, mapDispatch)(App);
