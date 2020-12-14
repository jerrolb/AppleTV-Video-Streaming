import {
  SET_INFO,
  SET_NEXT_URL,
  SET_IS_HEADER_FOCUSED,
  SET_SCREEN,
  SET_IS_RETURNING_FROM_PLAYER,
  SET_PLAYER,
  SET_IS_APP_LOADED,
  SET_IS_FEED_READY,
  SET_PLAYLISTS,
  SET_POSITION,
  SET_DEFAULT_STATE,
  SET_SHOULD_RETRY_BE_FOCUSED,
  SET_SHOULD_SERMONS_BE_FOCUSED,
  SET_SHOULD_SEARCH_BE_FOCUSED,
  SET_SHOULD_WATCHLIVE_BE_FOCUSED,
  SET_APP_START_TIME,
  SET_IS_DEBUG,
} from '../actionTypes';
import {SCREEN} from '../../Constants';

const initialState = {
  isDebug: false,
  appStartTime: null,
  screen: SCREEN.SPLASH,
  isHeaderFocused: true,
  isReturningFromPlayer: false,
  isAppLoaded: false,
  isFeedReady: false,
  shouldRetryBeFocused: false,
  shouldSermonsBeFocused: false,
  shouldSearchBeFocused: false,
  shouldWatchLiveBeFocused: false,
  playlists: [],
  info: {
    id: undefined,
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
    case SET_PLAYLISTS:
      return setPlaylists(state, payload);
    case SET_POSITION:
      return setPosition(state, payload);
    case SET_PLAYER:
      return setPlayer(state, payload);
    case SET_IS_RETURNING_FROM_PLAYER:
      return setIsReturningFromPlayer(state, payload);
    case SET_INFO:
      return setInfo(state, payload);
    case SET_NEXT_URL:
      return setNextUrl(state, payload);
    case SET_IS_HEADER_FOCUSED:
      return setIsHeaderFocused(state, payload);
    case SET_SCREEN:
      return setScreen(state, payload);
    case SET_IS_FEED_READY:
      return setIsFeedReady(state, payload);
    case SET_IS_APP_LOADED:
      return setIsAppLoaded(state, payload);
    case SET_SHOULD_RETRY_BE_FOCUSED:
      return setShouldRetryBeFocused(state, payload);
    case SET_SHOULD_SERMONS_BE_FOCUSED:
      return setShouldSermonsBeFocused(state, payload);
    case SET_SHOULD_SEARCH_BE_FOCUSED:
      return setShouldSearchBeFocused(state, payload);
    case SET_SHOULD_WATCHLIVE_BE_FOCUSED:
      return setShouldWatchLiveBeFocused(state, payload);
    case SET_APP_START_TIME:
      return setAppStartTime(state, payload);
    case SET_IS_DEBUG:
      return setIsDebug(state, payload);
    case SET_DEFAULT_STATE:
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

const setShouldWatchLiveBeFocused = (state, payload) => {
  return {
    ...state,
    shouldWatchLiveBeFocused: payload,
  };
};

const setAppStartTime = (state, payload) => {
  return {
    ...state,
    appStartTime: payload,
  };
};

const setIsDebug = (state, payload) => {
  return {
    ...state,
    isDebug: payload,
  };
};

export default reducer;
