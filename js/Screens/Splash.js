import React from 'react';
import {Image} from 'react-native';
import {IMG} from '../Constants';

const Splash = () => {
  return <Image resizeMode={'stretch'} style={styles.fullscreen} source={{uri: IMG.SPLASH}} />;
};

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
};

export default Splash;
