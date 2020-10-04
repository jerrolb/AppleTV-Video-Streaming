import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, TouchableHighlight} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DIMENSIONS} from '../Constants';

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
          renderItem={({item, index}) => {
            return (
              <TouchableHighlight
                style={styles.marginLeft}
                onFocus={() => {
                  this.playlistRow.snapToItem(index);
                }}>
                <Image
                  style={styles.thumbnailImage}
                  source={{uri: item.thumbnail}}
                />
              </TouchableHighlight>
            );
          }}
          sliderWidth={DIMENSIONS.WIDTH}
          sliderHeight={300}
          itemWidth={430}
          itemHeight={210}
          onSnapToItem={this.props.onSnapToItem}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
      </View>
    );
  }
}

Playlist.propTypes = {
  title: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSnapToItem: PropTypes.func.isRequired,
};

const styles = {
  playlistText: {
    marginLeft: 100,
    fontSize: 35,
    lineHeight: 100,
    fontWeight: 'bold',
    color: '#FFF',
  },
  marginLeft: {
    marginLeft: 100,
  },
  thumbnailImage: {
    width: 410,
    height: 220,
  },
};
