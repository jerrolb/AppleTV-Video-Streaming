import React from 'react';
import {TVEventHandler, TVMenuControl, View} from 'react-native';
import {Error, Home, Splash} from './Screens';
import {Player} from './Components';
import {
  ERR,
  IMG,
  URL,
  REMOTE,
  SCREEN,
  TRACKING_ID,
} from './Config/Constants.js';
import {FILLSCREEN, HIDDEN} from './Config/Styles.js';
import ReactGA from 'react-ga';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isFeedReady: false,
      screen: SCREEN.SPLASH,
      playlists: [],
      positionMap: {},
      position: {
        colIndex: 0,
        rowIndex: 0,
      },
      info: {
        title: '',
        description: '',
      },
      player: {
        enabled: false,
        visible: false,
        paused: false,
        url: '',
        nextUrl: '',
      },
      settings: {
        logo: IMG.LOGO,
        bgColor: '#000',
        infoTextColor: '#FFF',
        playlistTitleColor: '#FFF',
        highlightColor: 'lightblue',
      },
    };
  }

  componentDidMount() {
    this.fetchSettings();
    this.fetchFeed();
    this.enableTVEventHandler();
    ReactGA.initialize(TRACKING_ID);
  }

  componentWillUnmount() {
    ReactGA.pageview('home');
    ReactGA.event({
      category: 'Test Unmount',
      action: 'App was closed!',
    });
    this.disableTVEventHandler();
  }

  getNextUrl() {
    const colIndex = this.state.position.colIndex;
    const rowIndex = this.state.position.rowIndex;
    return this.state.playlists[colIndex].videos[rowIndex].url;
  }

  fetchFeed() {
    fetch(URL.FEED)
      .then(res => res.json())
      .then(feed => this.initFeed(feed))
      .catch(() => this.setScreen(SCREEN.ERROR));
  }

  fetchSettings() {
    fetch(URL.SETTINGS)
      .then(res => res.json())
      .then(settings => this.initSettings(settings))
      .catch(() => {});
  }

  initSettings(settings) {
    const newSettings = {};
    const defaults = this.state.settings;
    for (const key in defaults) {
      newSettings[key] = settings[key] || defaults[key];
    }
    this.setState({settings: newSettings});
  }

  updateInfo() {
    const colIndex = this.state.position.colIndex;
    const rowIndex = this.state.position.rowIndex;
    const currVideo = this.state.playlists[colIndex].videos[rowIndex];

    this.setState(prevState => ({
      info: {
        title: currVideo.title,
        description: currVideo.description,
      },
      player: {
        ...prevState.player,
        nextUrl: currVideo.url,
      },
    }));
  }

  getRefs() {
    const colIndex = this.state.position.colIndex;
    const playlist = `playlist${colIndex}`;
    const col = this.home.playlists.playlistCol;
    const row = this.home.playlists[playlist].playlistRow;
    return {col: col, row: row};
  }

  retry() {
    this.fetchFeed();
    this.setScreen(SCREEN.SPLASH);
    this.initSplashScreen();
  }

  handleBtnByScreen(btn) {
    if (this.isSplashScreen()) {
      return false;
    }
    if (this.isErrorScreen()) {
      if (btn === REMOTE.SELECT || btn === REMOTE.PLAYPAUSE) {
        return this.retry();
      }
    }
    if (this.isHomeScreen()) {
      const refs = this.getRefs();
      if (this.state.player.visible) {
        switch (btn) {
          case REMOTE.MENU:
            return this.returnFromPlayer();
          default:
            return;
        }
      } else {
        switch (btn) {
          case REMOTE.UP:
            return refs.col.snapToPrev();
          case REMOTE.DOWN:
            return refs.col.snapToNext();
          case REMOTE.LEFT:
            return refs.row.snapToPrev();
          case REMOTE.RIGHT:
            return refs.row.snapToNext();
          case REMOTE.PLAYPAUSE:
          case REMOTE.SELECT:
            return this.player &&
              this.player.props.url === this.state.player.nextUrl
              ? this.resumePlayer()
              : this.startPlayer();
          default:
            return;
        }
      }
    }
  }

  returnFromPlayer() {
    this.setState(
      prevState => ({
        player: {
          ...prevState.player,
          paused: true,
          visible: false,
        },
      }),
      () => this.disableTVMenuControl(),
    );
  }

  startPlayer() {
    this.setState(
      prevState => ({
        player: {
          ...prevState.player,
          enabled: false,
        },
      }),
      () => this.enablePlayer(),
    );
  }

  enablePlayer() {
    this.setState(
      prevState => ({
        player: {
          nextUrl: prevState.player.nextUrl,
          url: prevState.player.nextUrl,
          enabled: true,
          visible: true,
          paused: false,
        },
      }),
      () => this.enableTVMenuControl(),
    );
  }

  enableTVMenuControl() {
    TVMenuControl.enableTVMenuKey();
  }

  disableTVMenuControl() {
    TVMenuControl.disableTVMenuKey();
  }

  enableTVEventHandler() {
    this.tvEventHandler = new TVEventHandler();
    this.tvEventHandler.enable(this, (root, evt) => {
      const btn = evt && evt.eventType;
      if (btn) {
        return this.handleBtnByScreen(btn);
      }
    });
  }

  disableTVEventHandler() {
    if (this.tvEventHandler) {
      this.tvEventHandler.disable();
      delete this.tvEventHandler;
    }
  }

  initFeed(feed) {
    const positionMap = {};
    const playlists = [];
    let playlist;
    let itemIds;

    feed.categories.forEach((category, index) => {
      playlist = playlists[index] = {};
      playlist.title = category.name;
      playlist.videos = [];

      feed.playlists.some(feedPlaylist => {
        if (feedPlaylist.name === category.playlistName) {
          itemIds = feedPlaylist.itemIds;
        }
      });

      feed.shortFormVideos.forEach((video, i) => {
        if (itemIds.includes(video.id)) {
          playlist.videos.push({
            title: video.title,
            description: video.shortDescription,
            thumbnail: video.thumbnail,
            url:
              i === 0
                ? 'https://nolachurch.com/stream/dev/1/1080/1080.m3u8'
                : 'https://nolachurch.com/stream/dev/2/1080/1080.m3u8',
          });
          playlist.videos.push({
            title: `test ${i}`,
            description: `test ${i}`,
            thumbnail: video.thumbnail,
            url: video.content.videos[0].url,
          });
        }
      });

      positionMap[index] = 0;
    });

    this.setState({
      playlists: playlists,
      positionMap: positionMap,
      isFeedReady: true,
    });
  }

  startSplashTimeout() {
    setTimeout(() => {
      if (this.state.isFeedReady) {
        this.setScreen(SCREEN.HOME);
        this.updateInfo();
      } else {
        this.setScreen(SCREEN.ERROR);
      }
    }, 1000);
  }

  setScreen(newScreen) {
    this.setState({screen: newScreen});
  }
  isSplashScreen() {
    return this.state.screen === SCREEN.SPLASH;
  }
  isHomeScreen() {
    return this.state.screen === SCREEN.HOME;
  }
  isErrorScreen() {
    return this.state.screen === SCREEN.ERROR;
  }

  onSnapToItemRow(rowIndex) {
    this.setState(
      prevState => ({
        positionMap: {
          ...prevState.positionMap,
          [prevState.position.colIndex]: rowIndex,
        },
        position: {
          colIndex: prevState.position.colIndex,
          rowIndex: rowIndex,
        },
      }),
      this.updateInfo,
    );
  }

  onSnapToItemCol(colIndex) {
    this.setState(
      prevState => ({
        position: {
          colIndex: colIndex,
          rowIndex: prevState.positionMap[colIndex],
        },
      }),
      this.updateInfo,
    );
  }

  getHomeStyle() {
    return this.state.player.visible
      ? HIDDEN
      : [FILLSCREEN, {backgroundColor: this.state.settings.bgColor}];
  }

  getPlayerStyle() {
    return this.state.player.visible
      ? [FILLSCREEN, {backgroundColor: this.state.settings.bgColor}]
      : HIDDEN;
  }

  onPlayerError() {
    this.setState(prevState => ({
      player: {
        ...prevState.player,
        visible: false,
        enabled: false,
      },
    }));
  }

  resumePlayer() {
    this.setState(prevState => ({
      player: {
        ...prevState.player,
        visible: true,
        paused: false,
      },
    }));
  }

  renderScreen() {
    switch (this.state.screen) {
      case SCREEN.SPLASH:
        return <Splash />;
      case SCREEN.HOME:
        return (
          <View>
            <Home
              style={this.getHomeStyle()}
              ref={e => (this.home = e)}
              onSnapToItemRow={rowIndex => this.onSnapToItemRow(rowIndex)}
              onSnapToItemCol={colIndex => this.onSnapToItemCol(colIndex)}
              playlists={this.state.playlists}
              info={this.state.info}
              highlightColor={this.state.settings.highlightColor}
              infoTextColor={this.state.settings.infoTextColor}
              playlistTitleColor={this.state.settings.playlistTitleColor}
              logo={this.state.settings.logo}
            />
            {this.state.player.enabled && (
              <Player
                ref={e => (this.player = e)}
                style={this.getPlayerStyle()}
                paused={this.state.player.paused}
                onError={() => this.onPlayerError()}
                url={this.state.player.url}
              />
            )}
          </View>
        );
      case SCREEN.ERROR:
        return <Error />;
      default:
        return console.error(`${ERR.INVALID_SCREEN}: ${this.state.screen}`);
    }
  }

  render() {
    this.startSplashTimeout();
    return this.renderScreen();
  }
}

export default App;
