import React from 'react';
import {Image} from 'react-native';
import {COLORS, IMG} from '../Constants';

const Splash = () => {
  return (
    <Image
      resizeMode={'stretch'}
      style={styles.fullscreen}
      source={{uri: IMG.SPLASH}}
    />
  );
};

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
};

export default Splash;
