import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Image, View, ImageBackground} from 'react-native';
import {Header, Info} from '../Components';
import Playlists from '../Components/Playlists';
import Video from 'react-native-video';
import {IMG} from '../Constants';
import * as Player from '../Controllers/Player';

class Home extends React.Component {
  render() {
    return (
      <View>
        <View
          style={styles[this.props.player.visible ? 'hidden' : 'fullscreen']}>
          <Header ref={(e) => (this.header = e)} />

          <Image
            style={styles.heroImage}
            source={{uri: 'roots_9132020_background.jpg'}}
            // source={{uri: this.props.info.thumbnail}}
          />

          <Info />
          <Playlists ref={(e) => (this.playlists = e)} />
        </View>
        {this.props.player.enabled && (
          <View hasTVPreferredFocus={this.props.player.visible}>
            <Video
              style={
                styles[this.props.player.visible ? 'fullscreen' : 'hidden']
              }
              source={{uri: this.props.player.url, type: 'm3u8'}}
              controls={this.props.player.visible}
              paused={this.props.player.paused}
              onEnd={Player.exit}
              onError={Player.error}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapState = (state) => {
  return {
    info: state.info,
    player: state.player,
    playlists: state.playlists,
  };
};

export default connect(mapState, null, null, {forwardRef: true})(Home);

Home.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
};

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  gradient: {
    width: '100%',
    height: 575,
    position: 'absolute',
    top: 0,
    left: 515,
    zIndex: 1,
  },
  hidden: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
  },
  heroImage: {
    resizeMode: 'stretch',
    width: 1400,
    height: 575,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'red',
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
