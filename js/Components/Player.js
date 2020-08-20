import React from 'react';
import Video from 'react-native-video';

export default class Player extends React.Component {
  render() {
    return (
      <Video
        ref={e => (this.video = e)}
        style={this.props.style}
        source={{uri: this.props.url, type: 'm3u8'}}
        controls={true}
        onError={this.props.onError}
        rate={this.props.paused ? 0 : 1}
      />
    );
  }
}
