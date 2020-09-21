import React from 'react';
import {TVEventHandler, TVMenuControl} from 'react-native';
import {REMOTE, SCREEN, URL} from './Constants';
import {Error, Home, Splash} from './Screens';

class App extends React.Component {
  constructor() {
    super();
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.onPlayerError = this.onPlayerError.bind(this);
    this.state = {
      isFeedReady: false,
      isItemSnapping: false,
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

  fetchSettings() {
    fetch(URL.SETTINGS)
      .then((res) => res.json())
      .then((settings) => this.initSettings(settings))
      .catch(() => {});
  }

  fetchFeed() {
    fetch(URL.FEED)
      .then((res) => res.json())
      .then((feed) => this.initFeed(feed))
      .catch(() => this.setScreen(SCREEN.ERROR));
  }

  initFeed(feed) {
    const playlists = [];
    let playlist;
    let itemIds;

    feed.categories.forEach((category, index) => {
      playlist = playlists[index] = {};
      playlist.title = category.name;
      playlist.videos = [];

      feed.playlists.some((feedPlaylist) => {
        if (feedPlaylist.name === category.playlistName) {
          itemIds = feedPlaylist.itemIds;
        }
      });

      feed.shortFormVideos.forEach((video) => {
        if (itemIds.includes(video.id)) {
          playlist.videos.push({
            title: video.title,
            description: video.shortDescription,
            thumbnail: video.thumbnail,
            url: video.content.videos[0].url,
          });
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
      isItemSnapping: false,
    }));
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

  handleBtnByScreen(btn) {
    switch (this.state.screen) {
      case SCREEN.SPLASH:
        return false;
      case SCREEN.ERROR:
        if (
          btn === REMOTE.SELECT ||
          btn === REMOTE.LONGSELECT ||
          btn === REMOTE.PLAYPAUSE
        ) {
          return this.retry();
        }
        return false;
      case SCREEN.HOME:
        const refs = this.getRefs();
        if (this.state.player.visible) {
          return btn === REMOTE.MENU ? this.returnFromPlayer() : false;
        } else {
          switch (btn) {
            case REMOTE.UP:
              this.setState({isItemSnapping: true});
              return refs.col.snapToPrev();
            case REMOTE.DOWN:
              this.setState({isItemSnapping: true});
              return refs.col.snapToNext();
            case REMOTE.LEFT:
              this.setState({isItemSnapping: true});
              return refs.row.snapToPrev();
            case REMOTE.RIGHT:
              this.setState({isItemSnapping: true});
              return refs.row.snapToNext();
            case REMOTE.PLAYPAUSE:
            case REMOTE.SELECT:
            case REMOTE.LONGSELECT:
              if (!this.state.isItemSnapping) {
                return this.state.player.url === this.state.player.nextUrl
                  ? this.resumePlayer()
                  : this.initPlayer();
              }
              return;
            default:
              return;
          }
        }
      default:
        return;
    }
  }

  getNextUrl() {
    const colIndex = this.state.position.colIndex;
    const rowIndex = this.state.position.rowIndex;
    return this.state.playlists[colIndex].videos[rowIndex].url;
  }

  getRefs() {
    const colIndex = this.state.position.colIndex;
    const playlist = `playlist${colIndex}`;
    const col = this.home.playlists.playlistCol;
    const row = this.home.playlists[playlist].playlistRow;
    return {col: col, row: row};
  }

  returnFromPlayer() {
    TVMenuControl.disableTVMenuKey();
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        paused: true,
        visible: false,
      },
    }));
  }

  initPlayer() {
    if (this.state.player.enabled) {
      this.setState(
        (prevState) => ({
          player: {
            ...prevState.player,
            enabled: false,
          },
        }),
        this.enablePlayer,
      );
    } else {
      this.enablePlayer();
    }
  }

  enablePlayer() {
    TVMenuControl.enableTVMenuKey();
    const nextUrl = this.state.player.nextUrl;
    this.setState({
      player: {
        nextUrl: nextUrl,
        url: nextUrl,
        enabled: true,
        visible: true,
        paused: false,
      },
    });
  }

  resumePlayer() {
    TVMenuControl.enableTVMenuKey();
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        enabled: true,
        visible: true,
        paused: false,
      },
    }));
  }

  onPlayerError() {
    TVMenuControl.disableTVMenuKey();
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        visible: false,
        enabled: false,
      },
    }));
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
            onPlayerError={this.onPlayerError}
            onSnapToItem={this.onSnapToItem}
            colIndex={this.state.position.colIndex}
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
