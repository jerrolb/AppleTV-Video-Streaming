import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {Header, Info} from '../components';
import Playlists from '../components/Sermons/Playlists';
import Video from 'react-native-video';
import {COLORS, DIMENSIONS, IMG} from '../Constants';
import * as Player from '../controllers/Player';

const Sermons = (props) => {
  return (
    <View>
      <View style={styles[props.player.visible ? 'hidden' : 'fullscreen']}>
        <Header />
        <View style={styles.heroImageUnderlay}>
          <Image
            style={styles.heroImage}
            source={{uri: props.info.background}}
          />
        </View>
        <Info />
        <Playlists />
      </View>
      {props.player.enabled && (
        <View hasTVPreferredFocus={props.player.visible}>
          <Video
            style={styles[props.player.visible ? 'fullscreen' : 'hidden']}
            source={{uri: props.player.url, type: 'm3u8'}}
            controls={props.player.visible}
            paused={props.player.paused}
            onEnd={Player.exit}
            onError={Player.error}
            poster={IMG.SPINNER}
            posterResizeMode={'cover'}
          />
        </View>
      )}
    </View>
  );
};

const mapState = (state) => {
  return {
    info: state.info,
    player: state.player,
  };
};

export default connect(mapState)(Sermons);

Sermons.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
  }),
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
    width: DIMENSIONS.WIDTH,
    height: DIMENSIONS.HEIGHT,
    backgroundColor: COLORS.BLACK,
  },
  hidden: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
  },
  heroImage: {
    width: 1400,
    height: 575,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  heroImageUnderlay: {
    width: 1400,
    height: 575,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.BLACK,
  },
};
