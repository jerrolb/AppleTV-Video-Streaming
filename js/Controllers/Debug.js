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

export default debugCounter;
