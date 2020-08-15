import React from 'react';
import { TVEventHandler, View } from 'react-native';
import { Error, Home, Player, Splash } from './Screens';
import { ERR, URL, REMOTE, SCREEN } from './Config/Constants.js';

export const globalContext = React.createContext({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.state = {
      isFeedReady: false,
      screen: SCREEN.SPLASH,
      showPlayer: false,
      err: "",
      info: {
        title: "",
        description: ""
      },
      positionMap: {},
      position: {
        colIndex: 0,
        rowIndex: 0
      },
      playlists: []
    }
  }

  componentDidMount() {
    this.fetchFeed();
    this.enableTVEventHandler();
  }

  componentWillUnmount() {
    this.disableTVEventHandler();
  }

  fetchFeed() {
    fetch(URL.FEED)
      .then(res => res.json())
      .then(data => this.init(data))
      .catch(err => this.setState({ err: err }));
  }

  updateInfo() {
    const colIndex = this.state.position.colIndex;
    const rowIndex = this.state.position.rowIndex;
    const currVideo = this.state.playlists[colIndex].videos[rowIndex];

    this.setState({
      info: {
        title: currVideo.title,
        description: currVideo.description
      }
    })
  };

  getUrl() {
    const colIndex = this.state.position.colIndex;
    const rowIndex = this.state.position.rowIndex;
    return this.state.playlists[colIndex].videos[rowIndex].url;
  }

  getColRowRef() {
    const colIndex = this.state.position.colIndex;
    const playlist = `playlist${colIndex}`;
    const col = this.home &&
      this.home.playlists &&
      this.home.playlists.playlistCol;
    const row = this.home &&
      this.home.playlists &&
      this.home.playlists[playlist] &&
      this.home.playlists[playlist].playlistRow;
    return { col: col, row: row };
  }

  retry() {
    this.fetchFeed();
    this.setScreen(SCREEN.SPLASH);
    this.initSplashScreen();
  }

  handleBtnByScreen(btn) {
    if (this.isSplashScreen()) return false;
    if (this.isErrorScreen()) {
      if (btn === REMOTE.SELECT || btn === REMOTE.PLAYPAUSE) {
        this.setState({ isFeedReady: true });
        return this.retry();
      }
    }
    if (this.isHomeScreen()) {
      const ref = this.getColRowRef();
      switch (btn) {
        case REMOTE.UP: return ref.col.snapToPrev();
        case REMOTE.DOWN: return ref.col.snapToNext();
        case REMOTE.LEFT: return ref.row.snapToPrev();
        case REMOTE.RIGHT: return ref.row.snapToNext();
        case REMOTE.PLAYPAUSE:
        case REMOTE.SELECT: return this.setScreen(SCREEN.PLAYER);
        default: return;
      }
    }
    if (this.isPlayerScreen()) {
      switch (btn) {
        case REMOTE.MENU: return this.setScreen(SCREEN.HOME);
        default: return;
      }
    }
  }

  enableTVEventHandler() {
    this.tvEventHandler = new TVEventHandler();
    this.tvEventHandler.enable(this, (root, evt) => {
      const btn = evt && evt.eventType;
      if (btn) return this.handleBtnByScreen(btn);
    });
  }

  disableTVEventHandler() {
    if (this.tvEventHandler) {
      this.tvEventHandler.disable();
      delete this.tvEventHandler;
    }
  }

  init(data) {
    const positionMap = {};
    let playlists = [];
    let playlist;

    data.categories.forEach((category, index) => {
      playlist = playlists[index] = {};
      playlist.title = category.name;
      playlist.videos = [];
      let itemIds;

      data.playlists.some((playlist) => {
        if (playlist.name === category.playlistName) {
          itemIds = playlist.itemIds;
        }
      });

      data.shortFormVideos.forEach((video, i) => {
        if (itemIds.includes(video.id)) {
          playlist.videos.push({
            title: video.title,
            description: video.shortDescription,
            thumbnail: video.thumbnail,
            url: video.content.videos[0].url
          });
          playlist.videos.push({
            title: `test ${i}`,
            description: `test ${i}`,
            thumbnail: video.thumbnail,
            url: video.content.videos[0].url
          });
        }
      });

      positionMap[index] = 0;
    });

    this.setState({
      playlists: playlists,
      positionMap: positionMap
      // isFeedReady: false
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

  setScreen(newScreen) { this.setState({ screen: newScreen}); }
  isSplashScreen() { return this.state.screen === SCREEN.SPLASH; }
  isHomeScreen() { return this.state.screen === SCREEN.HOME; }
  isPlayerScreen() { return this.state.screen === SCREEN.PLAYER; }
  isErrorScreen() { return this.state.screen === SCREEN.ERROR; }

  onSnapToItemRow(rowIndex) {
    this.setState(prevState => ({
      positionMap: {
        ...prevState.positionMap,
        [prevState.position.colIndex]: rowIndex
      },
      position: {
        colIndex: prevState.position.colIndex,
        rowIndex: rowIndex
      }
    }), this.updateInfo);
  }

  onSnapToItemCol(colIndex) {
    this.setState(prevState => ({
      position: {
        colIndex: colIndex,
        rowIndex: prevState.positionMap[colIndex]
      }
    }), this.updateInfo);
  }

  renderScreen() {
    switch (this.state.screen) {
      case SCREEN.SPLASH: return <Splash/>;
      case SCREEN.HOME:
        return (
          <Home
            ref={(e) => { this.home = e; }}
            onSnapToItemRow={rowIndex => this.onSnapToItemRow(rowIndex)}
            onSnapToItemCol={colIndex => this.onSnapToItemCol(colIndex)}
            playlists={this.state.playlists}
          />
        );
      case SCREEN.PLAYER: return <Player url={this.getUrl()}/>
      case SCREEN.ERROR: return <Error err={this.state.err}/>
      default: return alert(`${ERR.INVALID_SCREEN}: ${this.state.screen}`);
    }
  }

  initSplashScreen() {
    if (this.isSplashScreen()) {
      this.startSplashTimeout();
    }
  }

  render() {
    this.initSplashScreen();
    return (
      <globalContext.Provider value={ this.state }>
        { this.renderScreen() }
      </globalContext.Provider>
    );
  }
}

export default App;
