import {Dimensions} from 'react-native';

const carouselPadding = 100;
const screenWidth = Dimensions.get('screen').width + carouselPadding;
const screenHeight = Dimensions.get('screen').height;

const DIMENSIONS = {
  WIDTH: screenWidth,
  HEIGHT: screenHeight,
};

const IMG = {
  CHEVRON_DOWN: 'chevronDown.png',
  CHEVRON_UP: 'chevronUp.png',
  LOGO: 'logo.png',
  SPLASH: 'splash.jpg',
  SPLASH_FILL: 'splashFill.png',
};

const REMOTE = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  SWIPEUP: 'swipeUp',
  SWIPEDOWN: 'swipeDown',
  SWIPELEFT: 'swipeLeft',
  SWIPERIGHT: 'swipeRight',
  SELECT: 'select',
  LONGSELECT: 'longSelect',
  PLAYPAUSE: 'playPause',
  MENU: 'menu',
};

const SCREEN = {
  CONTACT: 'contact',
  ERROR: 'error',
  GIVING: 'giving',
  HOME: 'home',
  SEARCH: 'search',
  SPLASH: 'splash',
  WATCHLIVE: 'watchLive',
};

const URL = {
  FEED: 'https://nolachurch.com/stream/feed.json',
};

export {DIMENSIONS, IMG, REMOTE, SCREEN, URL};
