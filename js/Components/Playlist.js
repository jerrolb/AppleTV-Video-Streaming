import React from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Thumbnail from './Thumbnail.js'

export default class Playlist extends React.Component {
  renderItem = ({item}) => <Thumbnail payload={item}/>;
 
  render () {
    return (
      <View style={{marginLeft: 30}}>
        <Text style={{
          color:'#FFF',
          fontSize: 35,
          lineHeight: 100,
          fontWeight: 'bold'
        }}>
          {this.props.title}
        </Text>
        <Carousel
          ref={(e) => { this.playlistRow = e; }}
          data={this.props.videos}
          layout={"default"}
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