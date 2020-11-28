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
  SETSHOULDSEARCHBEFOCUSED,
} from '../actionTypes';

export const setDefaultState = () => {
  return {
    type: SETDEFAULTSTATE,
    payload: null,
  };
};

export const setIsHeaderFocused = (payload) => {
  return {
    type: SETISHEADERFOCUSED,
    payload,
  };
};

export const setScreen = (payload) => {
  return {
    type: SETSCREEN,
    payload,
  };
};

export const setInfo = (payload) => {
  return {
    type: SETINFO,
    payload,
  };
};

export const setNextUrl = (payload) => {
  return {
    type: SETNEXTURL,
    payload,
  };
};

export const setIsReturningFromPlayer = (payload) => {
  return {
    type: SETISRETURNINGFROMPLAYER,
    payload,
  };
};

export const setPlayer = (payload) => {
  return {
    type: SETPLAYER,
    payload,
  };
};

export const setIsAppLoaded = (payload) => {
  return {
    type: SETISAPPLOADED,
    payload,
  };
};

export const setIsFeedReady = (payload) => {
  return {
    type: SETISFEEDREADY,
    payload,
  };
};

export const setPlaylists = (payload) => {
  return {
    type: SETPLAYLISTS,
    payload,
  };
};

export const setPosition = (payload) => {
  return {
    type: SETPOSITION,
    payload,
  };
};

export const setShouldRetryBeFocused = (payload) => {
  return {
    type: SETSHOULDRETRYBEFOCUSED,
    payload,
  };
};

export const setShouldSermonsBeFocused = (payload) => {
  return {
    type: SETSHOULDSERMONSBEFOCUSED,
    payload,
  };
};

export const setShouldSearchBeFocused = (payload) => {
  return {
    type: SETSHOULDSEARCHBEFOCUSED,
    payload,
  };
};
