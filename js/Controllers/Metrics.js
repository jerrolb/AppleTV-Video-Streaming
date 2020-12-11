import Token from '../Token';
import {URL} from '../Constants';
import store from '../redux/store/index';

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

const recordView = ({id, title, url}) => {
  if (isDevMode()) {
    return;
  }
  const params = generateParams({
    id: id,
    title: title,
    url: url,
    timestamp: new Date().toGMTString(),
    token: Token,
  });
  const urlWithParams = `${URL.METRICS}?${params}`;
  fetch(urlWithParams, options);
};

const recordSession = () => {
  if (isDevMode()) {
    return;
  }
  const appStartTime = store.getState().appStartTime;
  const seconds = Math.ceil((Date.now() - appStartTime) / 1000);
  const params = generateParams({
    seconds: seconds,
    timestamp: new Date().toGMTString(),
    token: Token,
  });
  const urlWithParams = `${URL.METRICS}?${params}`;
  fetch(urlWithParams, options);
};

export {recordView, recordSession};
