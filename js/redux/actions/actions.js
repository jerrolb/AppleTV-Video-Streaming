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
} from '../actionTypes';

export const setDefaultState = () => {
  return {
    type: SET_DEFAULT_STATE,
    payload: null,
  };
};

export const setIsHeaderFocused = (payload) => {
  return {
    type: SET_IS_HEADER_FOCUSED,
    payload,
  };
};

export const setScreen = (payload) => {
  return {
    type: SET_SCREEN,
    payload,
  };
};

export const setInfo = (payload) => {
  return {
    type: SET_INFO,
    payload,
  };
};

export const setNextUrl = (payload) => {
  return {
    type: SET_NEXT_URL,
    payload,
  };
};

export const setIsReturningFromPlayer = (payload) => {
  return {
    type: SET_IS_RETURNING_FROM_PLAYER,
    payload,
  };
};

export const setPlayer = (payload) => {
  return {
    type: SET_PLAYER,
    payload,
  };
};

export const setIsAppLoaded = (payload) => {
  return {
    type: SET_IS_APP_LOADED,
    payload,
  };
};

export const setIsFeedReady = (payload) => {
  return {
    type: SET_IS_FEED_READY,
    payload,
  };
};

export const setPlaylists = (payload) => {
  return {
    type: SET_PLAYLISTS,
    payload,
  };
};

export const setPosition = (payload) => {
  return {
    type: SET_POSITION,
    payload,
  };
};

export const setShouldRetryBeFocused = (payload) => {
  return {
    type: SET_SHOULD_RETRY_BE_FOCUSED,
    payload,
  };
};

export const setShouldSermonsBeFocused = (payload) => {
  return {
    type: SET_SHOULD_SERMONS_BE_FOCUSED,
    payload,
  };
};

export const setShouldSearchBeFocused = (payload) => {
  return {
    type: SET_SHOULD_SEARCH_BE_FOCUSED,
    payload,
  };
};
