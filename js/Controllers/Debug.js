import store from '../redux/store/index';
import {setIsDebug} from '../redux/actions/actions';

const THRESHOLD = 2000;
const LIMIT = 20;
let isDebug = false;
let count = 0;
let timer;

const resetCount = () => count = 0;

const debugCounter = () => {
  clearTimeout(timer);
  if (count === LIMIT) {
    resetCount();
    isDebug = store.getState().isDebug;
    store.dispatch(setIsDebug(!isDebug));
    return;
  }

  ++count;
  startResetTimer();
};

startResetTimer = () => {
  timer = setTimeout(resetCount, THRESHOLD);
};

const formatBytes = (bytes, decimals = 2) => {
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  if (bytes === 0) {
    return '0 Bytes';
  }
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export {
  debugCounter,
  formatBytes,
};
