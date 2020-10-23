import React from 'react';
import {AppState, TVEventHandler} from 'react-native';
import {REMOTE, SCREEN, URL} from './Constants';
import {
  Contact,
  Error,
  Giving,
  Home,
  Search,
  Splash,
  WatchLive,
} from './Screens';
import * as Player from './Controllers/Player';

class App extends React.Component {
  constructor() {
    super();
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.onAppStateChanged = this.onAppStateChanged.bind(this);
    this.state = {
      returningFromPlayer: false,
      appLoaded: false,
      isHeaderFocused: true,
      isFeedReady: false,
      playlists: [],
      screen: SCREEN.SPLASH,
      info: {
        title: '',
        description: '',
        thumbnail: undefined,
      },
      player: {
        enabled: false,
        visible: false,
        paused: false,
        url: '',
        nextUrl: '',
      },
      position: {
        colIndex: 0,
        rowIndex: 0,
      },
    };
  }

  setReturningFromPlayer(boo) {
    this.setState({returningFromPlayer: boo});
  }

  componentDidMount() {
    this.fetchFeed();
    this.enableTVEventHandler();
    AppState.addEventListener('change', this.onAppStateChanged);
  }

  onAppStateChanged(nextAppState) {
    if (nextAppState === 'active') {
      const setDefaultState = () => {
        this.setState(
          {
            appLoaded: false,
            isHeaderFocused: true,
            isFeedReady: false,
            playlists: [],
            screen: SCREEN.SPLASH,
            info: {
              title: '',
              description: '',
              thumbnail: undefined,
            },
            player: {
              enabled: false,
              visible: false,
              paused: false,
              url: '',
              nextUrl: '',
            },
            position: {
              colIndex: 0,
              rowIndex: 0,
            },
          },
          this.retry(),
        );
      };
      const trySetDefaultState = () => {
        if (this && this.setState) {
          setDefaultState();
        } else {
          setTimeout(trySetDefaultState, 100);
        }
      };
      trySetDefaultState();
    }
  }

  componentWillUnmount() {
    this.disableTVEventHandler();
  }

  enableTVEventHandler() {
    this.tvEventHandler = new TVEventHandler();
    this.tvEventHandler.enable(this, (root, evt) => {
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
        this.setState({lastBtnPressed: btn});
        switch (this.state.screen) {
          case SCREEN.SPLASH:
            return false;
          case SCREEN.ERROR:
            if (isSelectBtn) {
              return this.retry();
            }
            return false;
          case SCREEN.HOME:
            if (this.state.isHeaderFocused) {
              return false;
            }
            if (this.state.player.visible) {
              return btn === REMOTE.MENU ? Player.minimize(this) : false;
            } else {
              if (isSelectBtn) {
                return this.state.player.url === this.state.player.nextUrl
                  ? Player.resume(this)
                  : Player.init(this);
              } else if (btn === REMOTE.UP || btn === REMOTE.SWIPEUP) {
                if (this.state.position.colIndex === 0) {
                  this.home.header.sermons.Sermons.setNativeProps({
                    hasTVPreferredFocus: true,
                  });
                }
                return false;
              } else if (btn === REMOTE.DOWN || btn === REMOTE.SWIPEDOWN) {
              } else {
                return false;
              }
            }
            return false;
          default:
            return false;
        }
      }
    });
  }

  disableTVEventHandler() {
    if (this.tvEventHandler) {
      this.tvEventHandler.disable();
      delete this.tvEventHandler;
    }
  }

  fetchFeed() {
    const headers = {
      cache: 'no-cache',
    };
    fetch(URL.FEED, headers)
      .then((res) => res.json())
      .then((feed) => this.initFeed(feed))
      .catch(() => this.setScreen(SCREEN.ERROR));
  }

  initFeed(feed) {
    const videoLength = feed.shortFormVideos.length;
    const playlists = [];
    let itemIds = [];
    let playlist;
    let video;

    feed.categories.forEach((category, index) => {
      const debug = false;
      playlist = playlists[index] = {};
      playlist.title = category.name;
      playlist.videos = [];

      feed.playlists.some((feedPlaylist) => {
        if (feedPlaylist.name === category.playlistName) {
          itemIds = feedPlaylist.itemIds;
        }
      });

      itemIds.forEach((id) => {
        for (let i = 0; i < videoLength; ++i) {
          video = feed.shortFormVideos[i];
          if (id === video.id) {
            playlist.videos.push({
              title: video.title,
              description: video.shortDescription,
              thumbnail: video.thumbnail,
              url: debug
                ? i === 0
                  ? 'https://nolachurch.com/stream/dev/1/1080/1080.m3u8'
                  : 'https://nolachurch.com/stream/dev/2/1080/1080.m3u8'
                : video.content.videos[0].url,
            });
            break;
          }
        }
      });
    });

    this.setState({
      playlists: playlists,
      isFeedReady: true,
    });
  }

  retry() {
    this.fetchFeed();
    this.setScreen(SCREEN.SPLASH);
    this.startSplashTimeout();
  }

  startSplashTimeout() {
    setTimeout(() => {
      if (this.state.isFeedReady) {
        this.setScreen(SCREEN.HOME);
        this.updateInfo();
      } else {
        this.setScreen(SCREEN.ERROR);
      }
    }, 1750);
  }

  realI() {
    if (!this.home || !this.home.playlists) {
      return {
        row: null,
        col: null,
      };
    }
    const colIndex = this.home.playlists.playlistCol.currentIndex;
    const playlist = `playlist${colIndex}`;
    const rowIndex = this.home.playlists[playlist].playlistRow.currentIndex;
    return {
      col: colIndex,
      row: rowIndex,
    };
  }

  onSnapToItem() {
    const colIndex = this.home.playlists.playlistCol.currentIndex;
    const playlist = `playlist${colIndex}`;
    const rowIndex = this.home.playlists[playlist].playlistRow.currentIndex;
    this.setState(
      {
        position: {
          colIndex: colIndex,
          rowIndex: rowIndex,
        },
      },
      this.updateInfo,
    );
  }

  updateInfo() {
    const colIndex = this.state.position.colIndex;
    const rowIndex = this.state.position.rowIndex;
    const currVideo = this.state.playlists[colIndex].videos[rowIndex];

    this.setState((prevState) => ({
      info: {
        title: currVideo.title,
        description: currVideo.description,
        thumbnail: currVideo.thumbnail,
      },
      player: {
        ...prevState.player,
        nextUrl: currVideo.url,
      },
    }));
  }

  setScreen(newScreen) {
    if (newScreen === 'home') {
      this.setState(
        {
          position: {
            colIndex: 0,
            rowIndex: 0,
          },
        },
        () => {
          this.updateInfo();
          this.setState({screen: newScreen});
        },
      );
    } else {
      this.setState({screen: newScreen});
    }
  }

  setIsHeaderFocused(isHeaderFocused) {
    this.home &&
      this.home.playlists &&
      this.home.playlists.playlist0.playlistRow.snapToItem(0);
    this.setState({isHeaderFocused: isHeaderFocused});
  }

  renderScreen() {
    switch (this.state.screen) {
      case SCREEN.SPLASH:
        return <Splash />;
      case SCREEN.HOME:
        return (
          <Home
            ref={(e) => (this.home = e)}
            info={this.state.info}
            player={this.state.player}
            playlists={this.state.playlists}
            onPlayerError={() => {
              Player.error(this);
            }}
            onSnapToItem={this.onSnapToItem}
            colIndex={this.state.position.colIndex}
            doDisableTouchableHighlight={this.state.player.visible}
            setIsHeaderFocused={(isHeaderFocused) =>
              this.setIsHeaderFocused(isHeaderFocused)
            }
            isHeaderFocused={this.state.isHeaderFocused}
            setScreen={(screen) => this.setScreen(screen)}
            position={this.state.position}
            realI={this.realI()}
            appLoaded={() => {
              this.setState({appLoaded: true});
            }}
            isAppLoaded={this.state.appLoaded}
            onEnd={() => {
              Player.exit(this);
            }}
            returningFromPlayer={this.state.returningFromPlayer}
            setReturningFromPlayer={(boo) => this.setReturningFromPlayer(boo)}
          />
        );
      case SCREEN.ERROR:
        return <Error />;
      case SCREEN.CONTACT:
        return (
          <Contact
            setScreen={(screen) => this.setScreen(screen)}
            setIsHeaderFocused={(isHeaderFocused) =>
              this.setIsHeaderFocused(isHeaderFocused)
            }
          />
        );
      case SCREEN.GIVING:
        return (
          <Giving
            setScreen={(screen) => this.setScreen(screen)}
            setIsHeaderFocused={(isHeaderFocused) =>
              this.setIsHeaderFocused(isHeaderFocused)
            }
          />
        );
      case SCREEN.WATCHLIVE:
        return (
          <WatchLive
            setScreen={(screen) => this.setScreen(screen)}
            setIsHeaderFocused={(isHeaderFocused) =>
              this.setIsHeaderFocused(isHeaderFocused)
            }
          />
        );
      case SCREEN.SEARCH:
        return (
          <Search
            setScreen={(screen) => this.setScreen(screen)}
            setIsHeaderFocused={(isHeaderFocused) =>
              this.setIsHeaderFocused(isHeaderFocused)
            }
          />
        );
      default:
        return;
    }
  }

  render() {
    if (this.state.screen === SCREEN.SPLASH) {
      this.startSplashTimeout();
    }
    return this.renderScreen();
  }
}

export default App;
