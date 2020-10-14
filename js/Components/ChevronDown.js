import React from 'react';
import {Image, View} from 'react-native';
import {IMG} from '../Constants';

const ChevronDown = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.chevron} source={{uri: IMG.CHEVRON_DOWN}} />
    </View>
  );
};

const styles = {
  chevron: {
    width: 50,
    height: 35,
    opacity: 0.7,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    left: 0,
    width: '100%',
  },
};

export default ChevronDown;
