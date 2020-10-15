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
      />
    );
  };
  render() {
    return (
      <View>
        <View style={styles.highlight} />
        <View style={styles.marginHider} />
        <Image style={styles.imageFill} source={{uri: IMG.SPLASH_FILL}} />
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
  imageFill: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 100,
    opacity: 0.1,
    zIndex: 2,
  },
  marginHider: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'black',
    zIndex: 1,
  },
};
