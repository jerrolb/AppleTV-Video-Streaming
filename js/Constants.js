import {Dimensions} from 'react-native';

const carouselPadding = 100;
const screenWidth = Dimensions.get('screen').width + carouselPadding;
const screenHeight = Dimensions.get('screen').height;

const DIMENSIONS = {
  WIDTH: screenWidth,
  HEIGHT: screenHeight,
};

const IMG = {
  CONTACT: 'contact_layout.jpg',
  GIVING: 'give_layout.jpg',
  GRADIENT: 'gradient.png',
  SEARCH: 'search.png',
  SEARCH_BLUE: 'searchBlue.png',
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
  CONTACT: 'Contact',
  ERROR: 'Error',
  GIVING: 'Giving',
  SERMONS: 'Sermons',
  SEARCH: 'Search',
  SPLASH: 'Splash',
  WATCHLIVE: 'Watch Live',
};

const URL = {
  FEED: 'http://nolachurch.com/stream/feed.json',
};

export {DIMENSIONS, IMG, REMOTE, SCREEN, URL};
