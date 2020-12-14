import {URL} from '../Constants';
import store from '../redux/store/index';
import Token from '../Token';

const options = {
  method: 'POST',
};

const isDevMode = () => {
  return __DEV__;
};

const generateParams = (params) => {
  return Object.entries(params).map(([key, val]) => (
    `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
  )).join('&');
};

const getTimestamp = () => {
  const now = new Date();
  return `${now.toDateString()} ${now.toTimeString()}`;
}

const getDuration = () => {
  const appStartTime = store.getState().appStartTime;
  const seconds = Math.ceil((Date.now() - appStartTime) / 1000);
  let mins;
  let hours;

  if (!seconds) {
      return "1s";
  }

  if (seconds < 60) {
      return `${seconds}s`;
  }

  if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  }

  mins = Math.floor(seconds / 60);
  hours = Math.floor(mins / 60);
  mins %= 60;
  return `${hours}h ${mins}m ${seconds % 60}s`;
}

const recordView = ({id, title}) => {
  if (isDevMode()) {
    return;
  }
  const params = generateParams({
    id: id,
    title: title,
    timestamp: getTimestamp(),
    token: Token,
  });
  const urlWithParams = `${URL.METRICS}?${params}`;
  fetch(urlWithParams, options);
};

const recordSession = () => {
  if (isDevMode()) {
    return;
  }
  const params = generateParams({
    duration: getDuration(),
    timestamp: getTimestamp(),
    token: Token,
  });
  const urlWithParams = `${URL.METRICS}?${params}`;
  fetch(urlWithParams, options);
};

export {recordView, recordSession};
