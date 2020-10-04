import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Playlist from './Playlist';
import {DIMENSIONS} from '../Constants';

export default class Playlists extends Component {
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
      <View style={styles.fillArea}>
        <View style={styles.highlight} />
        <Carousel
          pointerEvents={
            this.props.doDisableTouchableHighlight ? 'none' : 'auto'
          }
          ref={(e) => (this.playlistCol = e)}
          data={this.props.playlists}
          layout={'default'}
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
  fillArea: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    position: 'absolute',
    top: 90,
    left: 90,
    width: 430,
    height: 240,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'lightblue',
  },
};
