import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  setIsAppLoaded,
  setIsHeaderFocused,
  setIsReturningFromPlayer,
  setPosition,
  setInfo,
  setNextUrl,
  setShouldSermonsBeFocused,
} from '../../redux/actions/actions';
import PropTypes from 'prop-types';
import {Pressable, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Playlist from './Playlist';
import {COLORS, DIMENSIONS} from '../../Constants';

const Playlists = (props) => {
  const [colIndex, setColIndex] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const playlistCol = useRef(null);
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current = refArr.current.slice(0, props.playlists.length);
  });

  const forceCurrentThumbnailActiveFocus = () => {
    refArr.current[colIndex].forceActiveFocus(rowIndex);
    playlistCol.current.snapToItem(colIndex);
    refArr.current[colIndex].snapToItem(rowIndex);
  };

  const updateVideoInfo = () => {
    const currVideo = props.playlists[colIndex].videos[rowIndex];
    props.setInfo({
      id: currVideo.id,
      title: currVideo.title,
      description: currVideo.description,
      background: currVideo.background,
    });
    props.setNextUrl(currVideo.url);
    props.setPosition({
      colIndex: colIndex,
      rowIndex: rowIndex,
    });
  };

  const renderPlaylist = ({item, index}) => {
    const setFocus = (currRowIndex) => {
      if (props.isReturningFromPlayer) {
        forceCurrentThumbnailActiveFocus();
        props.setIsReturningFromPlayer(false);
        return;
      }
      setColIndex(index);
      setRowIndex(currRowIndex);
      playlistCol.current.snapToItem(index);
      refArr.current[index].snapToItem(currRowIndex);
      props.setIsHeaderFocused(false);
    };
    return (
      <Playlist
        ref={(e) => (refArr.current[index] = e)}
        title={item.title}
        videos={item.videos}
        updateVideoInfo={updateVideoInfo}
        setFocus={(currRowIndex) => setFocus(currRowIndex)}
      />
    );
  };

  const onFocusInterceptFocused = () => {
    if (!props.isAppLoaded) {
      props.setIsAppLoaded(true);
      return;
    }
    if (props.isHeaderFocused || props.isReturningFromPlayer) {
      forceCurrentThumbnailActiveFocus();
    } else {
      props.setShouldSermonsBeFocused(true);
    }
    props.setIsHeaderFocused(false);
  };

  return (
    <View style={styles.hideBehind}>
      <Pressable
        style={styles.focusInterceptWrapper}
        onFocus={onFocusInterceptFocused}
      >
        <View style={styles.focusIntercept} />
      </Pressable>
      {!props.isHeaderFocused && <View style={styles.highlight} />}
      <Carousel
        pointerEvents={props.player.visible ? 'none' : 'auto'}
        ref={playlistCol}
        data={props.playlists}
        vertical={true}
        activeSlideAlignment={'start'}
        renderItem={renderPlaylist}
        sliderWidth={DIMENSIONS.WIDTH}
        sliderHeight={DIMENSIONS.HEIGHT}
        itemWidth={DIMENSIONS.WIDTH}
        itemHeight={320}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onSnapToItem={updateVideoInfo}
      />
    </View>
  );
};

const mapState = (state) => {
  return {
    isAppLoaded: state.isAppLoaded,
    isHeaderFocused: state.isHeaderFocused,
    isReturningFromPlayer: state.isReturningFromPlayer,
    playlists: state.playlists,
    position: state.position,
    player: state.player,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsAppLoaded: (isAppLoaded) => dispatch(setIsAppLoaded(isAppLoaded)),
    setIsHeaderFocused: (isHeaderFocused) =>
      dispatch(setIsHeaderFocused(isHeaderFocused)),
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
    setPosition: (position) => dispatch(setPosition(position)),
    setInfo: (info) => dispatch(setInfo(info)),
    setNextUrl: (nextUrl) => dispatch(setNextUrl(nextUrl)),
    setShouldSermonsBeFocused: (shouldSermonsBeFocused) =>
      dispatch(setShouldSermonsBeFocused(shouldSermonsBeFocused)),
  };
};

export default connect(mapState, mapDispatch)(Playlists);

const styles = {
  focusIntercept: {
    position: 'absolute',
    top: 100,
    left: 0,
    height: 0.5,
    width: '100%',
  },
  focusInterceptWrapper: {
    height: 0.5,
    width: '100%',
  },
  highlight: {
    position: 'absolute',
    top: 191,
    left: 80,
    width: 430,
    height: 240,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: COLORS.LIGHT_BLUE,
  },
  hideBehind: {
    position: 'absolute',
    top: 375,
    left: 0,
    zIndex: -1,
  },
};

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  setInfo: PropTypes.func.isRequired,
  setNextUrl: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
  setIsReturningFromPlayer: PropTypes.func.isRequired,
  isReturningFromPlayer: PropTypes.bool.isRequired,
  setIsHeaderFocused: PropTypes.func.isRequired,
  isHeaderFocused: PropTypes.bool.isRequired,
  setIsAppLoaded: PropTypes.func.isRequired,
  isAppLoaded: PropTypes.bool.isRequired,
  setShouldSermonsBeFocused: PropTypes.func.isRequired,
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
};
