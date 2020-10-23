import {Dimensions} from 'react-native';

const carouselPadding = 100;
const screenWidth = Dimensions.get('screen').width + carouselPadding;
const screenHeight = Dimensions.get('screen').height;

const DIMENSIONS = {
  WIDTH: screenWidth,
  HEIGHT: screenHeight,
};

const IMG = {
  SPLASH: 'splash.jpg',
  GIVING: 'give_layout.jpg',
  CONTACT: 'contact_layout.jpg',
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
