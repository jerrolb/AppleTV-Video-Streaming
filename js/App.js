import React from 'react';
import {TVEventHandler} from 'react-native';
import {REMOTE, SCREEN, URL} from './Constants';
import {Error, Home, Splash} from './Screens';
import * as Player from './Controllers/Player';

class App extends React.Component {
  constructor() {
    super();
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.state = {
      isFeedReady: false,
      playlists: [],
      screen: SCREEN.SPLASH,
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
      position: {
        colIndex: 0,
        rowIndex: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchFeed();
    this.enableTVEventHandler();
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
        switch (this.state.screen) {
          case SCREEN.SPLASH:
            return false;
          case SCREEN.ERROR:
            if (isSelectBtn) {
              return this.retry();
            }
            return false;
          case SCREEN.HOME:
            if (this.state.player.visible) {
              return btn === REMOTE.MENU ? Player.minimize(this) : false;
            } else {
              if (isSelectBtn) {
                return this.state.player.url === this.state.player.nextUrl
                  ? Player.resume(this)
                  : Player.init(this);
              } else {
                return false;
              }
            }
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
    fetch(URL.FEED)
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
      },
      player: {
        ...prevState.player,
        nextUrl: currVideo.url,
      },
    }));
  }

  setScreen(newScreen) {
    this.setState({screen: newScreen});
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
          />
        );
      case SCREEN.ERROR:
        return <Error />;
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
