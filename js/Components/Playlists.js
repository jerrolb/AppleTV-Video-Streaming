import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Playlist from './Playlist';
import {DIMENSIONS, IMG} from '../Constants';

export default class Playlists extends Component {
  renderPlaylist = ({item, index}) => {
    const ref = `playlist${index}`;
    return (
      <Playlist
        ref={(e) => (this[ref] = e)}
        title={item.title}
        videos={item.videos}
        onSnapToItem={this.props.onSnapToItem}
        snapToCol={() => {
          this.playlistCol.snapToItem(index);
        }}
        setIsHeaderFocused={this.props.setIsHeaderFocused}
        isHeaderFocused={() => this.props.isHeaderFocused}
        setFocus={(i) => {
          if (!this.props.isAppLoaded) {
            this.props.appLoaded();
            return;
          }
          if (this.props.returningFromPlayer) {
            this[`playlist${this.props.realI.col}`][
              `d${this.props.realI.row}`
            ].setNativeProps({hasTVPreferredFocus: true});
            this.props.setReturningFromPlayer(false);
            return;
          }
          if (
            this.props.isHeaderFocused &&
            this[`playlist${this.props.realI.col}`] &&
            this[`playlist${this.props.realI.row}`]
          ) {
            this[`playlist${this.props.realI.col}`][
              `d${this.props.realI.row}`
            ].setNativeProps({hasTVPreferredFocus: true});
            this.playlistCol.snapToItem(this.props.realI.col);
            this[`playlist${this.props.realI.col}`].playlistRow.snapToItem(
              this.props.realI.row,
            );
            this.props.setIsHeaderFocused(false);
          } else {
            this.playlistCol.snapToItem(index);
            this[ref].playlistRow.snapToItem(i);
          }
        }}
      />
    );
  };
  render() {
    return (
      <View style={{zIndex: -1}}>
        {!this.props.isHeaderFocused && <View style={styles.highlight} />}
        <Carousel
          pointerEvents={
            this.props.doDisableTouchableHighlight ? 'none' : 'auto'
          }
          ref={(e) => (this.playlistCol = e)}
          data={this.props.playlists}
          vertical={true}
          activeSlideAlignment={'start'}
          renderItem={this.renderPlaylist}
          sliderWidth={DIMENSIONS.WIDTH}
          sliderHeight={DIMENSIONS.HEIGHT}
          itemWidth={DIMENSIONS.WIDTH}
          itemHeight={320}
          onSnapToItem={this.props.onSnapToItem}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
      </View>
    );
  }
}

Playlists.propTypes = {
  onSnapToItem: PropTypes.func.isRequired,
  doDisableTouchableHighlight: PropTypes.bool.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = {
  highlight: {
    position: 'absolute',
    top: 190,
    left: 90,
    width: 430,
    height: 240,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'lightblue',
  },
};
