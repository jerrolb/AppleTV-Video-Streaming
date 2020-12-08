import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, TouchableHighlight, View} from 'react-native';
import {Header} from '../components';
import Carousel from 'react-native-snap-carousel';
import {WATCH_LIVE_DATA} from '../Constants';
import Thumbnail from '../components/WatchLive/Thumbnail';
import Popup from './Popup';
import Video from 'react-native-video';
import * as Player from '../controllers/Player';
import {
  setIsHeaderFocused,
  setShouldWatchLiveBeFocused,
  setIsReturningFromPlayer,
} from '../redux/actions/actions';

const WatchLive = (props) => {
  const [popup, setPopup] = useState('');
  const [isReturningFromPopup, setIsReturningFromPopup] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [position, setPosition] = useState({
    colIndex: 0,
    rowIndex: 0,
  });
  const refArr = useRef({});

  const forceCurrentItemActiveFocus = () => {
    refArr.current[`${position.colIndex}${position.rowIndex}`].setNativeProps({
      hasTVPreferredFocus: true,
    });
  };

  const onFocusInterceptFocused = () => {
    if (popup) {
      forceCurrentItemActiveFocus();
      return;
    }
    if (!isRendered) {
      setIsRendered(true);
      return;
    }
    if (props.isReturningFromPlayer || isReturningFromPopup) {
      forceCurrentItemActiveFocus();
      props.isReturningFromPlayer && props.setIsReturningFromPlayer(false);
      isReturningFromPopup && setIsReturningFromPopup(false);
      return;
    }
    if (props.isHeaderFocused) {
      forceCurrentItemActiveFocus();
      props.setIsHeaderFocused(false);
    } else {
      props.setShouldWatchLiveBeFocused(true);
    }
  };

  const clearPopup = () => {
    setIsReturningFromPopup(true);
    setPopup('');
  };

  return (
    <View style={styles.fullscreen}>
      {Boolean(popup) && (
        <View style={styles.popup}>
          <Popup
            popup={popup}
            clearPopup={clearPopup}
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
        style={styles[!props.player.visible ? {} : 'hidden']}>
        <Header />

        <TouchableHighlight
          style={styles.focusInterceptWrapper}
          onFocus={onFocusInterceptFocused}
        >
          <View style={styles.focusIntercept} />
        </TouchableHighlight>

        <View style={styles.contentMargin}>
          <Carousel
            data={WATCH_LIVE_DATA}
            vertical={true}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            scrollEnabled={false}
            renderItem={({item: playlist, index: colIndex}) => {
              return (
                <View style={styles.fullscreen}>
                  <Text style={styles.playlistTitle}>
                    {playlist.playlistTitle}
                  </Text>
                  <Carousel
                    activeSlideAlignment={'start'}
                    data={playlist.thumbnails}
                    sliderWidth={2000}
                    sliderHeight={240}
                    itemWidth={440}
                    itemHeight={260}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    scrollEnabled={false}
                    renderItem={({item: thumbnail, index: rowIndex}) => {
                      const refName = `${colIndex}${rowIndex}`;
                      return (
                        <Thumbnail
                          ref={(e) => (refArr.current[refName] = e)}
                          isPopup={typeof thumbnail === 'string'}
                          title={thumbnail.title || thumbnail}
                          setPopup={(newPopup) => setPopup(newPopup)}
                          setPosition={() => {
                            setPosition({
                              colIndex: colIndex,
                              rowIndex: rowIndex,
                            });
                          }}
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
    top: 90,
    left: 0,
    zIndex: 1,
  },
  hidden: {
    position: 'absolute',
    top: '-150%',
    left: '-150%',
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

WatchLive.propTypes = {
  isReturningFromPlayer: PropTypes.bool.isRequired,
  setIsReturningFromPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
  isHeaderFocused: PropTypes.bool.isRequired,
  setIsHeaderFocused: PropTypes.func.isRequired,
  setShouldWatchLiveBeFocused: PropTypes.func.isRequired,
};
