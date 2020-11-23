import {
  SETINFO,
  SETNEXTURL,
  SETISHEADERFOCUSED,
  SETSCREEN,
  SETISRETURNINGFROMPLAYER,
  SETPLAYER,
  SETISAPPLOADED,
  SETISFEEDREADY,
  SETPLAYLISTS,
  SETPOSITION,
  SETDEFAULTSTATE,
  SETSHOULDRETRYBEFOCUSED,
  SETSHOULDSERMONSBEFOCUSED,
  SETSHOULDSEARCHBEFOCUSED
} from '../actionTypes';
import {SCREEN} from '../../Constants';

const initialState = {
  screen: SCREEN.SPLASH,
  isHeaderFocused: true,
  isReturningFromPlayer: false,
  isAppLoaded: false,
  isFeedReady: false,
  shouldRetryBeFocused: false,
  shouldSermonsBeFocused: false,
  shouldSearchBeFocused: false,
  playlists: [],
  info: {
    title: '',
    description: '',
    thumbnail: undefined,
  },
  player: {
    enabled: false,
    visible: false,
    paused: false,
    url: '',
    nextUrl: '',
  },
  position: {
    colIndex: 0,
    rowIndex: 0,
  },
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SETPLAYLISTS:
      return setPlaylists(state, payload);
    case SETPOSITION:
      return setPosition(state, payload);
    case SETPLAYER:
      return setPlayer(state, payload);
    case SETISRETURNINGFROMPLAYER:
      return setIsReturningFromPlayer(state, payload);
    case SETINFO:
      return setInfo(state, payload);
    case SETNEXTURL:
      return setNextUrl(state, payload);
    case SETISHEADERFOCUSED:
      return setIsHeaderFocused(state, payload);
    case SETSCREEN:
      return setScreen(state, payload);
    case SETISFEEDREADY:
      return setIsFeedReady(state, payload);
    case SETISAPPLOADED:
      return setIsAppLoaded(state, payload);
    case SETSHOULDRETRYBEFOCUSED:
      return setShouldRetryBeFocused(state, payload);
    case SETSHOULDSERMONSBEFOCUSED:
      return setShouldSermonsBeFocused(state, payload);
    case SETSHOULDSEARCHBEFOCUSED:
      return setShouldSearchBeFocused(state, payload);
    case SETDEFAULTSTATE:
      return initialState;
    default:
      return state;
  }
};

const setInfo = (state, payload) => {
  return {
    ...state,
    info: payload,
  };
};

const setNextUrl = (state, payload) => {
  return {
    ...state,
    player: {
      ...state.player,
      nextUrl: payload,
    },
  };
};

const setIsHeaderFocused = (state, payload) => {
  return {
    ...state,
    isHeaderFocused: payload,
  };
};

const setScreen = (state, payload) => {
  return {
    ...state,
    screen: payload,
  };
};

const setIsReturningFromPlayer = (state, payload) => {
  return {
    ...state,
    isReturningFromPlayer: payload,
  };
};

const setPlayer = (state, payload) => {
  return {
    ...state,
    player: {
      ...state.player,
      ...payload,
    },
  };
};

const setIsFeedReady = (state, payload) => {
  return {
    ...state,
    isFeedReady: payload,
  };
};

const setIsAppLoaded = (state, payload) => {
  return {
    ...state,
    isAppLoaded: payload,
  };
};

const setPlaylists = (state, payload) => {
  return {
    ...state,
    playlists: payload,
  };
};

const setPosition = (state, payload) => {
  return {
    ...state,
    position: {
      ...state.position,
      ...payload,
    },
  };
};

const setShouldRetryBeFocused = (state, payload) => {
  return {
    ...state,
    shouldRetryBeFocused: payload,
  };
};

const setShouldSermonsBeFocused = (state, payload) => {
  return {
    ...state,
    shouldSermonsBeFocused: payload,
  };
};

const setShouldSearchBeFocused = (state, payload) => {
  return {
    ...state,
    shouldSearchBeFocused: payload,
  };
};

export default reducer;
