import {TVMenuControl} from 'react-native';
import store from '../redux/store/index';
import {setPlayer, setIsReturningFromPlayer} from '../redux/actions/actions';

const enable = () => {
  TVMenuControl.enableTVMenuKey();
  const nextUrl = store.getState().player.nextUrl;
  store.dispatch(
    setPlayer({
      nextUrl: nextUrl,
      url: nextUrl,
      enabled: true,
      visible: true,
      paused: false,
    }),
  );
};

const disable = () => {
  store.dispatch(
    setPlayer({
      enabled: false,
    }),
  );
};

const error = () => {
  TVMenuControl.disableTVMenuKey();
  store.dispatch(setIsReturningFromPlayer(true));
  store.dispatch(
    setPlayer({
      visible: false,
      enabled: false,
    }),
  );
};

const init = () => {
  if (store.getState().player.enabled) {
    disable();
    enable();
  } else {
    enable();
  }
};

const minimize = () => {
  TVMenuControl.disableTVMenuKey();
  store.dispatch(setIsReturningFromPlayer(true));
  store.dispatch(
    setPlayer({
      paused: true,
      visible: false,
    }),
  );
};

const resume = () => {
  TVMenuControl.enableTVMenuKey();
  store.dispatch(
    setPlayer({
      enabled: true,
      visible: true,
      paused: false,
    }),
  );
};

const exit = () => {
  TVMenuControl.disableTVMenuKey();
  store.dispatch(setIsReturningFromPlayer(true));
  store.dispatch(
    setPlayer({
      enabled: false,
      visible: false,
      paused: false,
    }),
  );
};

export {enable, error, exit, init, minimize, resume};
