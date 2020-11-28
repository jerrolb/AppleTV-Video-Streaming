import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, TouchableHighlight} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DIMENSIONS} from '../Constants';

export default class Playlist extends Component {
  render() {
    return (
      <View style={styles.marginTop}>
        <Text style={styles.playlistText}>{this.props.title}</Text>
        <Carousel
          ref={(e) => (this.playlistRow = e)}
          data={this.props.videos}
          activeSlideAlignment={'start'}
          onSnapToItem={() => this.props.setInfo()}
          renderItem={({item, index}) => {
            return (
              <TouchableHighlight
                ref={(e) => (this[`thumbnail${index}`] = e)}
                style={styles.marginLeft}
                onFocus={() => {
                  this.props.setFocus(index);
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
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          removeClippedSubviews={true}
        />
      </View>
    );
  }
}

Playlist.propTypes = {
  title: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = {
  playlistText: {
    marginLeft: 70,
    fontSize: 35,
    lineHeight: 100,
    fontWeight: 'bold',
    color: '#FFF',
  },
  marginLeft: {
    marginLeft: 90,
  },
  marginTop: {
    marginTop: 100,
  },
  thumbnailImage: {
    width: 410,
    height: 220,
  },
};
