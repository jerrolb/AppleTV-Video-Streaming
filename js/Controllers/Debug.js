import store from '../redux/store/index';
import {setScreen} from '../redux/actions/actions';
import {SCREEN} from '../Constants';

const THRESHOLD = 2000;
const limit = 30;
let count = 0;
let timer;

const resetCount = () => count = 0;

const debugCounter = () => {
  clearTimeout(timer);
  if (count === limit) {
    resetCount();
    store.dispatch(setScreen(SCREEN.DEBUG));
    return;
  }

  ++count;
  startResetTimer();
};

startResetTimer = () => {
  timer = setTimeout(resetCount, THRESHOLD);
};

export default debugCounter;
