import React from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Highlight from './Highlight.js';
import Playlist from './Playlist.js';
import {PLAYLIST} from '../Config/Styles.js';

export default class Playlists extends React.Component {
  renderItem = ({item, index}) => {
    const ref = `playlist${index}`;
    return (
      <Playlist
        ref={e => (this[ref] = e)}
        title={item.title}
        videos={item.videos}
        onSnapToItemRow={this.props.onSnapToItemRow}
        playlistTitleColor={this.props.playlistTitleColor}
      />
    );
  };
  render() {
    return (
      <View style={PLAYLIST}>
        <Highlight highlightColor={this.props.highlightColor} />
        <Carousel
          ref={e => (this.playlistCol = e)}
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
