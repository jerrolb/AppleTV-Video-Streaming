import React from 'react';
import {Image, View} from 'react-native';
import {THUMBNAIL, THUMBNAIL_IMAGE} from '../Config/Styles.js';

const Thumbnail = props => {
  return (
    <View style={THUMBNAIL}>
      <Image style={THUMBNAIL_IMAGE} source={{uri: props.thumbnail}} />
    </View>
  );
};

export default Thumbnail;
