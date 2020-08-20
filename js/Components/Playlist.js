import React from 'react';
import {Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Thumbnail from './Thumbnail.js';
import {PLAYLIST, PLAYLIST_TEXT} from '../Config/Styles.js';

export default class Playlist extends React.Component {
  renderItem = ({item}) => <Thumbnail thumbnail={item.thumbnail} />;

  render() {
    return (
      <View style={PLAYLIST}>
        <Text style={[PLAYLIST_TEXT, {color: this.props.playlistTitleColor}]}>
          {this.props.title}
        </Text>
        <Carousel
          ref={e => (this.playlistRow = e)}
          data={this.props.videos}
          layout={'default'}
          activeSlideAlignment={'start'}
          renderItem={this.renderItem}
          sliderWidth={1920}
          sliderHeight={300}
          itemWidth={420}
          itemHeight={210}
          onSnapToItem={this.props.onSnapToItemRow}
        />
      </View>
    );
  }
}
