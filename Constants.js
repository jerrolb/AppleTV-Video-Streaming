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
    FETCH_FAILURE: `Sorry, something has gone wrong! \n\n Check your internet connection and try again. \n\n If this problem continues, please email info@nolachurch.com.`
}

export {
    ERR,
    IMG,
    URL,
    REMOTE,
    SCREEN
};