import {TVEventHandler} from 'react-native';
import store from '../redux/store/index';
import {REMOTE, SCREEN} from '../Constants';
import * as Player from '../Controllers/Player';
import {
  setShouldSermonsBeFocused,
  setShouldRetryBeFocused,
} from '../redux/actions/actions';

const tvEventHandler = new TVEventHandler();
const enable = () => {
  tvEventHandler.enable(this, (_, evt) => {
    const checkIsSelectBtn = (btn) => {
      switch (btn) {
        case REMOTE.SELECT:
        case REMOTE.LONGSELECT:
        case REMOTE.PLAYPAUSE:
          return true;
        default:
          return false;
      }
    };
    const btn = evt && evt.eventType;
    const isSelectBtn = checkIsSelectBtn(btn);
    if (btn) {
      switch (store.getState().screen) {
        case SCREEN.SPLASH:
          return false;
        case SCREEN.ERROR:
          if (btn === REMOTE.UP || btn === REMOTE.SWIPEUP) {
            if (store.getState().isHeaderFocused) {
              return false;
            } else {
              store.dispatch(setShouldSermonsBeFocused(true));
              return false;
            }
          }
          if (btn === REMOTE.DOWN || btn === REMOTE.SWIPEDOWN) {
            store.dispatch(setShouldRetryBeFocused(true));
            return false;
          }
          return false;
        case SCREEN.SERMONS:
          if (store.getState().isHeaderFocused) {
            return false;
          }
          if (store.getState().player.visible) {
            return btn === REMOTE.MENU ? Player.minimize() : false;
          } else {
            if (isSelectBtn) {
              return store.getState().player.url ===
                store.getState().player.nextUrl
                ? Player.resume()
                : Player.init();
            } else {
              return false;
            }
          }
        case SCREEN.SEARCH:
          if (store.getState().player.visible) {
            return btn === REMOTE.MENU ? Player.minimize() : false;
          }
          return false;
        case SCREEN.WATCHLIVE:
          if (store.getState().player.visible) {
            return btn === REMOTE.MENU ? Player.minimize() : false;
          }
          return false;
        default:
          return false;
      }
    }
  });
};

const disable = () => tvEventHandler.disable();

export {disable, enable};
