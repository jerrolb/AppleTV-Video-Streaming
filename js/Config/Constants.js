const URL = {
  FEED: `https://nolachurch.com/stream/feed.json`
};

const SCREEN = {
  HOME: `home`,
  PLAYER: `player`,
  SPLASH: `splash`
};

const IMG = {
  BACKGROUND: `https://nolachurch.com/stream/images/background.png`,
  LOGO: `https://nolachurch.com/stream/images/logo.png`,
  SPLASH: `https://nolachurch.com/stream/images/splash.jpg`
};

const REMOTE = {
  UP: `up`,
  DOWN: `down`,
  LEFT: `left`,
  RIGHT: `right`,
  PLAYPAUSE: `playPause`,
  SELECT: `select`,
  MENU: `menu`
};

const ERR = {
  INVALID_SCREEN: `[App.js][renderScreen] Screen not handled!`,
}

export {
  ERR,
  IMG,
  URL,
  REMOTE,
  SCREEN
};