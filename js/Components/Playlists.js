import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';
import Playlist from './Playlist.js';

export default class Playlists extends React.Component {
  renderItem = ({item, index}) => {
    const ref = `playlist${index}`;
    return (
      <Playlist
        ref={(e) => { this[ref] = e; }}
        title={item.title}
        videos={item.videos}
        onSnapToItemRow={this.props.onSnapToItemRow}
      />
    );
  }
  render () {
    return (
      <View style={{marginLeft: 30}}>
        <Carousel
          ref={(e) => { this.playlistCol = e; }}
          data={ this.props.playlists }
          layout={"default"}
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