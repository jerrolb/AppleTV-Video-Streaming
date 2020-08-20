import React from 'react';
import {View} from 'react-native';
import {Header, Info, Playlists} from '../Components';

export default class Home extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <Header logo={this.props.logo} />
        <Info info={this.props.info} infoTextColor={this.props.infoTextColor} />
        <Playlists
          ref={e => (this.playlists = e)}
          playlists={this.props.playlists}
          onSnapToItemRow={this.props.onSnapToItemRow}
          onSnapToItemCol={this.props.onSnapToItemCol}
          highlightColor={this.props.highlightColor}
          playlistTitleColor={this.props.playlistTitleColor}
        />
      </View>
    );
  }
}
