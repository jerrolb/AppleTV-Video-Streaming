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
  ERROR: 'error',
  HOME: 'home',
  SPLASH: 'splash',
};

const URL = {
  FEED: 'https://nolachurch.com/stream/feed.json',
  SETTINGS: 'https://nolachurch.com/stream/appletv/settings.json',
};

export {DIMENSIONS, IMG, REMOTE, SCREEN, URL};
