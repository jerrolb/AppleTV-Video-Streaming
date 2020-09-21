import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DIMENSIONS} from '../Constants';
import Thumbnail from './Thumbnail';

export default class Playlist extends Component {
  render() {
    return (
      <View>
        <Text style={styles.playlistText}>{this.props.title}</Text>
        <Carousel
          ref={(e) => (this.playlistRow = e)}
          data={this.props.videos}
          layout={'default'}
          activeSlideAlignment={'start'}
          renderItem={Thumbnail}
          sliderWidth={DIMENSIONS.WIDTH}
          sliderHeight={300}
          itemWidth={430}
          itemHeight={210}
          onSnapToItem={this.props.onSnapToItem}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          contentContainerCustomStyle={styles.leftPadding}
        />
      </View>
    );
  }
}

const styles = {
  playlistText: {
    marginLeft: 100,
    fontSize: 35,
    lineHeight: 100,
    fontWeight: 'bold',
    color: '#FFF',
  },
  leftPadding: {
    paddingLeft: 100,
  },
};
