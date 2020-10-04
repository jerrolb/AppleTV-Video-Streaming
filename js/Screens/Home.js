import React from 'react';
import {View} from 'react-native';
import {ChevronDown, ChevronUp, Header, Info} from '../Components';
import Playlists from '../Components/Playlists';
import Video from 'react-native-video';

export default class Home extends React.Component {
  render() {
    const doShowChevronUp = this.props.colIndex > 0;
    const doShowChevronDown = Boolean(
      this.props.playlists[this.props.colIndex + 2],
    );
    return (
      <View>
        <View
          style={this.props.player.visible ? styles.hidden : styles.fullscreen}>
          <Header />
          <Info info={this.props.info} />
          {(doShowChevronUp && <ChevronUp />) || <View style={styles.spacer} />}
          <Playlists
            ref={(e) => (this.playlists = e)}
            playlists={this.props.playlists}
            onSnapToItem={this.props.onSnapToItem}
            doDisableTouchableHighlight={this.props.doDisableTouchableHighlight}
          />
          {doShowChevronDown && <ChevronDown />}
        </View>
        {this.props.player.enabled && (
          <Video
            style={
              this.props.player.visible ? styles.fullscreen : styles.hidden
            }
            source={{uri: this.props.player.url, type: 'm3u8'}}
            controls={true}
            onError={this.props.onPlayerError}
            paused={this.props.player.paused}
          />
        )}
      </View>
    );
  }
}

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  hidden: {
    width: 0,
    height: 0,
  },
  spacer: {
    height: 35,
  },
};
