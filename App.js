import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TVEventHandler,
  TVMenuControl,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';

class App extends React.Component {
  constructor() {
    super();
    this.config = {
      screen: 'splash',
      isFeedReady: false,
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
    };
  }

  componentDidMount() {
    this.fetchFeed();
    this.enableTVEventHandler();
  }

  componentWillUnmount() {
    this.disableTVEventHandler();
  }

  getNextUrl() {
    const colIndex = this.config.position.colIndex;
    const rowIndex = this.config.position.rowIndex;
    return this.config.playlists[colIndex].videos[rowIndex].url;
  }

  fetchFeed() {
    fetch('https://nolachurch.com/stream/feed.json')
      .then((res) => res.json())
      .then((feed) => this.initFeed(feed))
      .catch(() => (this.config.screen = 'error'));
  }

  updateInfo() {
    const colIndex = this.config.position.colIndex;
    const rowIndex = this.config.position.rowIndex;
    const currVideo = this.config.playlists[colIndex].videos[rowIndex];

    this.config.info = {
      title: currVideo.title,
      description: currVideo.description,
    };
    this.config.player.nextUrl = currVideo.url;
    this.forceUpdate();
  }

  getRefs() {
    const colIndex = this.config.position.colIndex;
    const playlist = `playlist${colIndex}`;
    const col = this.playlists.playlistCol;
    const row = this.playlists[playlist].playlistRow;
    return {col: col, row: row};
  }

  retry() {
    this.fetchFeed();
    this.config.screen = 'splash';
    this.startSplashTimeout();
  }

  handleBtnByScreen(btn) {
    switch (this.config.screen) {
      case 'splash':
        return false;
      case 'error':
        if (btn === 'select' || btn === 'playPause') {
          return this.retry();
        }
        return false;
      case 'home':
        const refs = this.getRefs();
        if (this.config.player.visible) {
          switch (btn) {
            case 'menu':
              return this.returnFromPlayer();
            default:
              return;
          }
        } else {
          switch (btn) {
            case 'up':
              return refs.col.snapToPrev();
            case 'down':
              return refs.col.snapToNext();
            case 'left':
              return refs.row.snapToPrev();
            case 'right':
              return refs.row.snapToNext();
            case 'playPause':
            case 'select':
              return this.config.player.url === this.config.player.nextUrl
                ? this.resumePlayer()
                : this.startPlayer();
            default:
              return;
          }
        }
      default:
        return;
    }
  }

  returnFromPlayer() {
    this.disableTVMenuControl();
    this.config.player.paused = true;
    this.config.player.visible = false;
    this.forceUpdate();
  }

  startPlayer() {
    this.config.player.enabled = false;
    this.forceUpdate();
    this.enablePlayer();
  }

  enablePlayer() {
    this.enableTVMenuControl();
    const nextUrl = this.config.player.nextUrl;
    this.config.player = {
      nextUrl: nextUrl,
      url: nextUrl,
      enabled: true,
      visible: true,
      paused: false,
    };
    this.forceUpdate();
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

      feed.playlists.some((feedPlaylist) => {
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

    this.config.playlists = playlists;
    this.config.positionMap = positionMap;
    this.config.isFeedReady = true;
  }

  startSplashTimeout() {
    setTimeout(() => {
      if (this.config.isFeedReady) {
        this.config.screen = 'home';
        this.updateInfo();
      } else {
        this.config.screen = 'error';
        this.forceUpdate();
      }
    }, 1000);
  }

  onSnapToItemRow(rowIndex) {
    const colIndex = this.config.position.colIndex;
    this.config.positionMap[colIndex] = rowIndex;
    this.config.position = {
      colIndex: colIndex,
      rowIndex: rowIndex,
    };
    this.updateInfo();
  }

  onSnapToItemCol(colIndex) {
    const rowIndex = this.config.positionMap[colIndex];
    this.config.position = {
      colIndex: colIndex,
      rowIndex: rowIndex,
    };
    this.updateInfo();
  }

  onPlayerError() {
    this.config.player.visible = false;
    this.config.player.enabled = false;
    this.forceUpdate();
  }

  resumePlayer() {
    this.enableTVMenuControl();
    this.config.player.visible = true;
    this.config.player.paused = false;
    this.forceUpdate();
  }

  renderScreen() {
    switch (this.config.screen) {
      case 'splash':
        return <Image style={styles.fullscreen} source={{uri: 'splash.jpg'}} />;
      case 'home':
        return (
          <View>
            <View
              style={
                this.config.player.visible ? styles.hidden : styles.fullscreen
              }>
              <View style={styles.header}>
                <Image style={styles.logo} source={{uri: 'logo.png'}} />
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>{this.config.info.title}</Text>
                <Text style={styles.infoDescription}>
                  {this.config.info.description}
                </Text>
              </View>
              <Playlists
                ref={(e) => (this.playlists = e)}
                playlists={this.config.playlists}
                onSnapToItemRow={(rowIndex) => this.onSnapToItemRow(rowIndex)}
                onSnapToItemCol={(colIndex) => this.onSnapToItemCol(colIndex)}
              />
            </View>
            {this.config.player.enabled && (
              <Video
                style={
                  this.config.player.visible ? styles.fullscreen : styles.hidden
                }
                source={{uri: this.config.player.url, type: 'm3u8'}}
                controls={true}
                onError={() => this.onPlayerError()}
                rate={this.config.player.paused ? 0 : 1}
              />
            )}
          </View>
        );
      case 'error':
        return (
          <View style={styles.fullscreen}>
            <View style={styles.header}>
              <Image style={styles.logo} source={{uri: 'logo.png'}} />
            </View>
            <View style={styles.center}>
              <Text style={styles.errorText}>
                <Text>{'There was a problem getting your content!\n\n'}</Text>
                <Text>Contact </Text>
                <Text style={styles.bold}>info@nolachurch.com </Text>
                <Text>{'if the problem persists.\n\n'}</Text>
                <Text>Please click the touchpad to try again.</Text>
              </Text>
            </View>
          </View>
        );
      default:
        return;
    }
  }

  render() {
    if (this.config.screen === 'splash') {
      this.startSplashTimeout();
    }
    return this.renderScreen();
  }
}

class Playlists extends React.Component {
  renderItem = ({item, index}) => {
    const ref = `playlist${index}`;
    return (
      <Playlist
        ref={(e) => (this[ref] = e)}
        title={item.title}
        videos={item.videos}
        onSnapToItemRow={this.props.onSnapToItemRow}
      />
    );
  };
  render() {
    return (
      <View style={styles.playlist}>
        <View style={styles.highlight} />
        <Carousel
          ref={(e) => (this.playlistCol = e)}
          data={this.props.playlists}
          layout={'default'}
          vertical={true}
          activeSlideAlignment={'start'}
          renderItem={this.renderItem}
          sliderWidth={1920}
          sliderHeight={1080}
          itemWidth={1920}
          itemHeight={315}
          onSnapToItem={this.props.onSnapToItemCol}
        />
      </View>
    );
  }
}

class Playlist extends React.Component {
  render() {
    return (
      <View style={styles.playlist}>
        <Text style={styles.playlistText}>{this.props.title}</Text>
        <Carousel
          ref={(e) => (this.playlistRow = e)}
          data={this.props.videos}
          layout={'default'}
          activeSlideAlignment={'start'}
          renderItem={({item}) => {
            return (
              <View style={styles.thumbnail}>
                <Image
                  style={styles.thumbnailImage}
                  source={{uri: item.thumbnail}}
                />
              </View>
            );
          }}
          sliderWidth={1920}
          sliderHeight={300}
          itemWidth={420}
          itemHeight={210}
          onSnapToItem={this.props.onSnapToItemRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  hidden: {
    width: 0,
    height: 0,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  bold: {
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    height: 100,
    marginLeft: 20,
  },
  highlight: {
    position: 'absolute',
    top: 90,
    left: 20,
    width: 430,
    height: 240,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'lightblue',
  },
  info: {
    width: '100%',
    height: 225,
    marginLeft: 30,
  },
  infoTitle: {
    lineHeight: 100,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoDescription: {
    fontSize: 25,
    color: '#FFF',
  },
  logo: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
  },
  playlist: {
    marginLeft: 30,
  },
  playlistText: {
    fontSize: 35,
    lineHeight: 100,
    fontWeight: 'bold',
    color: '#FFF',
  },
  thumbnail: {
    width: 420,
    height: 230,
  },
  thumbnailImage: {
    width: 410,
    height: 220,
  },
});

export default App;
