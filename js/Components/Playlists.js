import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  setIsAppLoaded,
  setIsHeaderFocused,
  setIsReturningFromPlayer,
  setPosition,
  setInfo,
  setNextUrl,
  setShouldSermonsBeFocused,
} from '../redux/actions/actions';
import PropTypes from 'prop-types';
import {TouchableHighlight, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Playlist from './Playlist';
import {DIMENSIONS} from '../Constants';

class Playlists extends Component {
  constructor() {
    super();
    this.state = {
      colIndex: 0,
      rowIndex: 0,
    };
  }
  forceCurrentThumbnailActiveFocus() {
    const colIndex = this.state.colIndex;
    const rowIndex = this.state.rowIndex;
    const playlist = `playlist${colIndex}`;
    const thumbnail = `thumbnail${rowIndex}`;
    this[playlist][thumbnail].setNativeProps({hasTVPreferredFocus: true});
    this.playlistCol.snapToItem(colIndex);
    this[playlist].playlistRow.snapToItem(rowIndex);
  }
  setInfo = () => {
    const colIndex = this.state.colIndex;
    const rowIndex = this.state.rowIndex;
    const currVideo = this.props.playlists[colIndex].videos[rowIndex];
    this.props.setInfo({
      title: currVideo.title,
      description: currVideo.description,
      background: currVideo.background,
    });
    this.props.setNextUrl(currVideo.url);
    this.props.setPosition({
      colIndex: colIndex,
      rowIndex: rowIndex,
    });
  };
  renderPlaylist = ({item, index}) => {
    const ref = `playlist${index}`;
    const setFocus = (rowIndex) => {
      if (this.props.isReturningFromPlayer) {
        this.forceCurrentThumbnailActiveFocus();
        this.props.setIsReturningFromPlayer(false);
        return;
      }
      this.setState({colIndex: index, rowIndex: rowIndex});
      this.playlistCol.snapToItem(index);
      this[ref].playlistRow.snapToItem(rowIndex);
      this.props.setIsHeaderFocused(false);
    };
    return (
      <Playlist
        ref={(e) => (this[ref] = e)}
        title={item.title}
        videos={item.videos}
        setInfo={() => this.setInfo()}
        setFocus={(rowIndex) => setFocus(rowIndex)}
      />
    );
  };
  render() {
    return (
      <View style={styles.hideBehind}>
        <TouchableHighlight
          style={styles.focusInterceptWrapper}
          onFocus={() => {
            if (!this.props.isAppLoaded) {
              this.props.setIsAppLoaded(true);
              return;
            }
            if (
              this.props.isHeaderFocused ||
              this.props.isReturningFromPlayer
            ) {
              this.forceCurrentThumbnailActiveFocus();
            } else {
              this.props.setShouldSermonsBeFocused(true);
            }
            this.props.setIsHeaderFocused(false);
          }}>
          <View style={styles.focusIntercept} />
        </TouchableHighlight>
        {!this.props.isHeaderFocused && <View style={styles.highlight} />}
        <Carousel
          pointerEvents={this.props.player.visible ? 'none' : 'auto'}
          ref={(e) => (this.playlistCol = e)}
          data={this.props.playlists}
          vertical={true}
          activeSlideAlignment={'start'}
          renderItem={this.renderPlaylist}
          sliderWidth={DIMENSIONS.WIDTH}
          sliderHeight={DIMENSIONS.HEIGHT}
          itemWidth={DIMENSIONS.WIDTH}
          itemHeight={320}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          onSnapToItem={() => this.setInfo()}
          removeClippedSubviews={true}
        />
      </View>
    );
  }
}

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

export default connect(mapState, mapDispatch, null, {forwardRef: true})(
  Playlists,
);

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

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
    top: 190,
    left: 80,
    width: 430,
    height: 240,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'lightblue',
  },
  hideBehind: {
    position: 'absolute',
    top: 375,
    left: 0,
    zIndex: -1,
  },
};
