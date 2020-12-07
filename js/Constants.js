import {Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');
const screenWidth = dimensions.width;
const screenHeight = dimensions.height;

const FETCH_TIMEOUT = 10000;

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
  SELECTGROUP: (btn) => ['select', 'longSelect', 'playPause'].includes(btn),
  UPGROUP: (btn) => ['up', 'swipeUp'].includes(btn),
  DOWNGROUP: (btn) => ['down', 'swipeDown'].includes(btn),
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

const WATCH_LIVE_DATA = [
  {
    playlistTitle: 'NOLA OnDemand',
    thumbnails: [
      {
        title: 'Sunday LIVE',
        url:
          'https://player.vimeo.com/external/457335295.m3u8?s=61ebdfc9a33fe1c1d01de24ba5d953bfbeaed953',
      },
      {
        title: 'Wednesday LIVE',
        url:
          'https://player.vimeo.com/external/457335295.m3u8?s=61ebdfc9a33fe1c1d01de24ba5d953bfbeaed953',
      },
    ],
  },
  {
    playlistTitle: 'Online Campus',
    thumbnails: [
      'Watch Parties',
      'Get A Gift',
      'Join The NOLA Fam',
      'Join Us On FB',
    ],
  },
];

export {DIMENSIONS, FETCH_TIMEOUT, IMG, REMOTE, SCREEN, URL, WATCH_LIVE_DATA};
