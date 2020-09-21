import React from 'react';
import {Image, View} from 'react-native';
import {IMG} from '../Constants';

const ChevronUp = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.chevron} source={{uri: IMG.CHEVRON_UP}} />
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
  },
};

export default ChevronUp;
