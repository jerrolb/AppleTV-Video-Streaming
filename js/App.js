import React from 'react';
import {connect} from 'react-redux';
import {
  setScreen,
  setInfo,
  setNextUrl,
  setPlayer,
  setIsReturningFromPlayer,
  setIsFeedReady,
  setPlaylists,
  setPosition,
  setDefaultState,
} from './redux/actions/actions';
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

class App extends React.Component {
  constructor() {
    super();
    this.onAppStateChanged = this.onAppStateChanged.bind(this);
  }

  componentDidMount() {
    Feed.get();
    Remote.enable(this);
    AppState.addEventListener('change', this.onAppStateChanged);
  }

  onAppStateChanged(nextAppState) {
    if (nextAppState === 'active') {
      const trySetDefaultState = () => {
        if (this && this.setState) {
          this.props.setDefaultState();
          this.restart();
        } else {
          setTimeout(trySetDefaultState, 100);
        }
      };
      trySetDefaultState();
    }
  }

  componentWillUnmount() {
    Remote.disable(this);
  }

  restart() {
    Feed.get();
    this.props.setScreen(SCREEN.SPLASH);
    this.startSplashTimeout();
  }

  startSplashTimeout() {
    setTimeout(() => {
      this.props.setScreen(
        SCREEN[this.props.isFeedReady ? 'SERMONS' : 'ERROR'],
      );
    }, 1750);
  }

  renderScreen() {
    switch (this.props.screen) {
      case SCREEN.SPLASH:
        return <Splash />;
      case SCREEN.SERMONS:
        return <Home ref={(e) => (this.home = e)} />;
      case SCREEN.ERROR:
        return <Error restart={() => this.restart()} />;
      case SCREEN.CONTACT:
        return <Contact />;
      case SCREEN.GIVING:
        return <Giving />;
      case SCREEN.WATCHLIVE:
        return <WatchLive />;
      case SCREEN.SEARCH:
        return <Search />;
      default:
        return;
    }
  }

  render() {
    if (this.props.screen === SCREEN.SPLASH) {
      this.startSplashTimeout();
    }
    return this.renderScreen();
  }
}

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
  return {
    setDefaultState: () => dispatch(setDefaultState()),
    setPlayer: (props) => dispatch(setPlayer(props)),
    setPlaylists: (playlists) => dispatch(setPlaylists(playlists)),
    setPosition: (position) => dispatch(setPosition(position)),
    setIsFeedReady: (isFeedReady) => dispatch(setIsFeedReady(isFeedReady)),
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
    setInfo: (info) => dispatch(setInfo(info)),
    setNextUrl: (nextUrl) => dispatch(setNextUrl(nextUrl)),
    setScreen: (screen) => dispatch(setScreen(screen)),
  };
};

export default connect(mapState, mapDispatch)(App);
