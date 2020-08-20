const STREAM = 'https://nolachurch.com/stream';
const ASSETS = `${STREAM}/appletv/assets`;
const TRACKING_ID = 'stream-6e5d3';

const URL = {
  FEED: `${STREAM}/feed.json`,
  SETTINGS: `${STREAM}/appletv/settings.json`,
};

const SCREEN = {
  HOME: 'home',
  PLAYER: 'player',
  SPLASH: 'splash',
};

const IMG = {
  LOGO: `${ASSETS}/logo.png`,
  SPLASH: 'splash.jpg',
};

const REMOTE = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  PLAYPAUSE: 'playPause',
  SELECT: 'select',
  MENU: 'menu',
};

const ERR = {
  INVALID_SCREEN: '[App.js][renderScreen] Screen not handled!',
};

export {ERR, IMG, URL, REMOTE, SCREEN, TRACKING_ID};
