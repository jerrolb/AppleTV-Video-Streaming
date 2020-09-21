import React from 'react';
import {Image} from 'react-native';

const Thumbnail = ({item}) => {
  return <Image style={styles.thumbnailImage} source={{uri: item.thumbnail}} />;
};

const styles = {
  thumbnailImage: {
    width: 410,
    height: 220,
  },
};

export default Thumbnail;
