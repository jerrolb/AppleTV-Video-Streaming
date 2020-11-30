import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {Header} from '../Components';
import Carousel from 'react-native-snap-carousel';
import {WATCH_LIVE_DATA} from '../Constants';
import Thumbnail from '../Components/WatchLive/Thumbnail';
import {Popup} from '../Screens';
import Video from 'react-native-video';
import * as Player from '../Controllers/Player';

const WatchLive = (props) => {
  const [popup, setPopup] = useState('');

  return (
    <View pointerEvents={popup ? 'none' : 'auto'} style={styles.fullscreen}>
      {Boolean(popup) && (
        <View pointerEvents={popup ? 'none' : 'auto'} style={styles.popup}>
          <Popup
            popup={popup}
            clearPopup={() => {
              setPopup('');
            }}
          />
        </View>
      )}
      {props.player.enabled && (
        <View hasTVPreferredFocus={props.player.visible}>
          <Video
            style={styles[props.player.visible ? 'fullscreen' : 'hidden']}
            source={{uri: props.player.url, type: 'm3u8'}}
            controls={props.player.visible}
            paused={props.player.paused}
            onEnd={Player.exit}
            onError={Player.error}
          />
        </View>
      )}
      <View
        pointerEvents={popup ? 'none' : 'auto'}
        style={styles[!props.player.visible ? {} : 'hidden']}>
        <Header screen={'Watch Live'} />
        <View style={styles.contentMargin}>
          <Carousel
            pointerEvents={popup ? 'none' : 'auto'}
            data={WATCH_LIVE_DATA}
            vertical={true}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            removeClippedSubviews={true}
            scrollEnabled={false}
            renderItem={({item: playlist, index: colIndex}) => {
              return (
                <View
                  style={styles.fullscreen}
                  pointerEvents={popup ? 'none' : 'auto'}>
                  <Text style={styles.playlistTitle}>
                    {playlist.playlistTitle}
                  </Text>
                  <Carousel
                    pointerEvents={popup ? 'none' : 'auto'}
                    activeSlideAlignment={'start'}
                    data={playlist.thumbnails}
                    sliderWidth={2000}
                    sliderHeight={240}
                    itemWidth={440}
                    itemHeight={260}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    scrollEnabled={false}
                    removeClippedSubviews={true}
                    renderItem={({item: thumbnail, index: rowIndex}) => {
                      return (
                        <Thumbnail
                          pointerEvents={popup ? 'none' : 'auto'}
                          isPopup={typeof thumbnail === 'string'}
                          title={thumbnail.title || thumbnail}
                          setPopup={(newPopup) => setPopup(newPopup)}
                        />
                      );
                    }}
                  />
                </View>
              );
            }}
            sliderWidth={2000}
            sliderHeight={2000}
            itemWidth={1000}
            itemHeight={325}
          />
        </View>
      </View>
    </View>
  );
};

const mapState = (state) => {
  return {
    player: state.player,
  };
};

export default connect(mapState)(WatchLive);

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  contentMargin: {
    marginTop: 100,
    marginLeft: 90,
  },
  playlistTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFF',
    paddingBottom: 10,
  },
  popup: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  hidden: {
    position: 'absolute',
    top: '150%',
    left: '150%',
    width: 0,
    height: 0,
  },
};
