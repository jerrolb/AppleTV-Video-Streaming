import React from 'react';
import PropTypes from 'prop-types';
import {Image, ImageBackground, View} from 'react-native';
import {ChevronDown, ChevronUp, Header, Info} from '../Components';
import Playlists from '../Components/Playlists';
import Video from 'react-native-video';
import {IMG} from '../Constants';

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

          <Image
            style={{
              width: '100%',
              height: 575,
              position: 'absolute',
              top: 0,
              left: 550,
            }}
            source={{uri: this.props.info.thumbnail}}
          />
          <Image
            style={{
              width: '100%',
              height: 575,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            source={{uri: 'gradient.png'}}
          />

          <Info info={this.props.info} />
          {/* {doShowChevronUp && <ChevronUp />} */}
          <Playlists
            ref={(e) => (this.playlists = e)}
            playlists={this.props.playlists}
            onSnapToItem={this.props.onSnapToItem}
            doDisableTouchableHighlight={this.props.doDisableTouchableHighlight}
          />
          {/* {doShowChevronDown && <ChevronDown />} */}
        </View>
        {this.props.player.enabled && (
          <Video
            style={
              this.props.player.visible ? styles.fullscreen : styles.hidden
            }
            source={{uri: this.props.player.url, type: 'm3u8'}}
            controls={this.props.doDisableTouchableHighlight}
            onError={this.props.onPlayerError}
            paused={this.props.player.paused}
          />
        )}
      </View>
    );
  }
}

Home.propTypes = {
  colIndex: PropTypes.number.isRequired,
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSnapToItem: PropTypes.func.isRequired,
  doDisableTouchableHighlight: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
  onPlayerError: PropTypes.func.isRequired,
};

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
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  imageOpacity: {
    opacity: 0.1,
  },
  spacer: {
    height: 35,
  },
};
