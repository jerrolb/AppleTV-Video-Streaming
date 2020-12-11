import {TVMenuControl} from 'react-native';
import store from '../redux/store/index';
import {setPlayer, setIsReturningFromPlayer} from '../redux/actions/actions';
import * as Metrics from '../controllers/Metrics';

const enable = (url) => {
  const nextUrl = store.getState().player.nextUrl;
  const info = store.getState().info;
  TVMenuControl.enableTVMenuKey();
  Metrics.recordView({
    id: info.id,
    title: info.title,
    url: nextUrl,
  });

  store.dispatch(
      setPlayer({
        nextUrl: url || nextUrl,
        url: url || nextUrl,
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

const init = (url) => {
  if (store.getState().player.enabled) {
    disable();
    enable(url);
  } else {
    enable(url);
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

const playVideo = () => {
  const player = store.getState().player;
  player.url === player.nextUrl ? resume() : init();
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

export {enable, error, exit, init, minimize, playVideo, resume};
