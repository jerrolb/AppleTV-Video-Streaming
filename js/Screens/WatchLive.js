import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {Text, TouchableHighlight, View} from 'react-native';
import {Header} from '../components';
import Carousel from 'react-native-snap-carousel';
import {WATCH_LIVE_DATA} from '../Constants';
import Thumbnail from '../components/WatchLive/Thumbnail';
import Popup from './Popup';
import Video from 'react-native-video';
import * as Player from '../controllers/Player';
import { setIsHeaderFocused, setShouldWatchLiveBeFocused, setIsReturningFromPlayer } from '../redux/actions/actions';

const WatchLive = (props) => {
  const [popup, setPopup] = useState('');
  const [isRendered, setIsRendered] = useState(false);
  const sundayLiveRef = useRef(null);

  const onFocusInterceptFocused = () => {
    if (!isRendered) {
      setIsRendered(true);
      return;
    }
    if (props.isReturningFromPlayer) {
      sundayLiveRef.current.setNativeProps({ hasTVPreferredFocus: true });
      props.setIsReturningFromPlayer(false);
      return;
    }
    if (props.isHeaderFocused) {
      sundayLiveRef.current.setNativeProps({ hasTVPreferredFocus: true });
    } else {
      props.setShouldWatchLiveBeFocused(true);
    }
    props.setIsHeaderFocused(false);
  }

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

        <TouchableHighlight
          style={styles.focusInterceptWrapper}
          onFocus={onFocusInterceptFocused}
        >
          <View style={styles.focusIntercept} />
        </TouchableHighlight>

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
                          ref={!colIndex && !rowIndex && sundayLiveRef}
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
    isHeaderFocused: state.isHeaderFocused,
    isReturningFromPlayer: state.isReturningFromPlayer,
    player: state.player,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsHeaderFocused: (isHeaderFocused) =>
      dispatch(setIsHeaderFocused(isHeaderFocused)),
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
    setShouldWatchLiveBeFocused: (shouldWatchLiveBeFocused) =>
      dispatch(setShouldWatchLiveBeFocused(shouldWatchLiveBeFocused)),
  };
};

export default connect(mapState, mapDispatch)(WatchLive);

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
  focusIntercept: {
    position: 'absolute',
    left: 0,
    height: 1,
    width: '100%',
    paddingTop: 1,
  },
  focusInterceptWrapper: {
    height: 1,
    width: '100%',
  },
};
