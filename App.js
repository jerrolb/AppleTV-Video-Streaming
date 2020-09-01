import React from 'react';
import {Dimensions, Image, Text, TVEventHandler, TVMenuControl, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';

const carouselPadding = 100;
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width + carouselPadding;

class App extends React.Component {
  constructor() {
    super();
    this.config = {
      screen: 'splash',
      isFeedReady: false,
      isItemSnapping: false,
      playlists: [],
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
    this.fetchSettings();
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
    fetch('https://nolachurch.com/stream/appletv/settings.json')
      .then((res) => res.json())
      .then((settings) => this.initSettings(settings))
      .catch(() => {});
  }

  fetchFeed() {
    fetch('https://nolachurch.com/stream/feed.json')
      .then((res) => res.json())
      .then((feed) => this.initFeed(feed))
      .catch(() => (this.config.screen = 'error'));
  }

  initSettings(settings) {
    if (settings.bgColor) {
      styles.fullscreen.backgroundColor = settings.bgColor;
    }
    if (settings.highlightColor) {
      styles.highlight.borderColor = settings.highlightColor;
    }
    if (settings.infoTextColor) {
      styles.infoTitle.color = settings.infoTextColor;
      styles.infoDescription.color = settings.infoTextColor;
    }
    if (settings.playlistTitleColor) {
      styles.playlistText.color = settings.playlistTitleColor;
    }
    if (settings.logo) {
      styles.logoSource = settings.logo;
    }
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
          for (var j = 0; j < 10; j++) {
            playlist.videos.push({
              title: `test ${j}`,
              description: `test ${j}`,
              thumbnail: video.thumbnail,
              url: video.content.videos[0].url,
            });
          }
        }
      });

    });

    this.config.playlists = playlists;
    this.config.isFeedReady = true;
  }

  retry() {
    this.fetchFeed();
    this.config.screen = 'splash';
    this.startSplashTimeout();
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
    this.config.isItemSnapping = false;
    this.forceUpdate();
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
          return btn === 'menu' ? this.returnFromPlayer() : false;
        } else {
          switch (btn) {
            case 'up':
              this.config.isItemSnapping = true;
              return refs.col.snapToPrev();
            case 'down':
              this.config.isItemSnapping = true;
              return refs.col.snapToNext();
            case 'left':
              this.config.isItemSnapping = true;
              return refs.row.snapToPrev();
            case 'right':
              this.config.isItemSnapping = true;
              return refs.row.snapToNext();
            case 'playPause':
            case 'select':
              if (!this.config.isItemSnapping) {
                return this.config.player.url === this.config.player.nextUrl
                  ? this.resumePlayer()
                  : this.initPlayer();
              }
            default:
              return;
          }
        }
      default:
        return;
    }
  }

  getNextUrl() {
    const colIndex = this.config.position.colIndex;
    const rowIndex = this.config.position.rowIndex;
    return this.config.playlists[colIndex].videos[rowIndex].url;
  }

  getRefs() {
    const colIndex = this.config.position.colIndex;
    const playlist = `playlist${colIndex}`;
    const col = this.playlists.playlistCol;
    const row = this.playlists[playlist].playlistRow;
    return {col: col, row: row};
  }

  returnFromPlayer() {
    TVMenuControl.disableTVMenuKey();
    this.config.player.paused = true;
    this.config.player.visible = false;
    this.forceUpdate();
  }

  initPlayer() {
    if (this.config.player.enabled) {
      this.config.player.enabled = false;
      this.forceUpdate();
    }
    this.enablePlayer();
  }

  enablePlayer() {
    TVMenuControl.enableTVMenuKey();
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

  resumePlayer() {
    TVMenuControl.enableTVMenuKey();
    this.config.player.enabled = true;
    this.config.player.visible = true;
    this.config.player.paused = false;
    this.forceUpdate();
  }

  onPlayerError() {
    TVMenuControl.disableTVMenuKey();
    this.config.player.visible = false;
    this.config.player.enabled = false;
    this.forceUpdate();
  }

  onSnapToItem() {
    const colIndex = this.playlists.playlistCol.currentIndex;
    const playlist = `playlist${colIndex}`;
    const rowIndex = this.playlists[playlist].playlistRow.currentIndex;
    this.config.position = {
      colIndex: colIndex,
      rowIndex: rowIndex,
    };
    this.updateInfo();
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
                <Image style={styles.logo} source={{uri: styles.logoSource}} />
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
                onSnapToItem={() => { this.onSnapToItem() }}
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
                paused={this.config.player.paused}
              />
            )}
          </View>
        );
      case 'error':
        return (
          <View style={styles.fullscreen}>
            <View style={styles.header}>
              <Image style={styles.logo} source={{uri: styles.logoSource}} />
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
  renderPlaylist = ({item, index}) => {
    const ref = `playlist${index}`;
    return (
      <Playlist
        ref={(e) => (this[ref] = e)}
        title={item.title}
        videos={item.videos}
        onSnapToItem={this.props.onSnapToItem}
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
          renderItem={this.renderPlaylist}
          sliderWidth={screenWidth}
          sliderHeight={screenHeight}
          itemWidth={screenWidth}
          itemHeight={315}
          onSnapToItem={this.props.onSnapToItem}
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
          sliderWidth={screenWidth}
          sliderHeight={300}
          itemWidth={420}
          itemHeight={210}
          onSnapToItem={this.props.onSnapToItem}
        />
      </View>
    );
  }
}

const styles = {
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
  logoSource: 'logo.png',
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
};

export default App;
