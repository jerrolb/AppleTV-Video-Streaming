import React from 'react';
import { Image, View } from 'react-native';
import { IMG } from '../Config/Constants.js';
import { BODY, FULLSCREEN } from '../Config/Styles.js'

export default Splash = () => {
  return (
    <View style={BODY}>
      <Image
        style={FULLSCREEN}
        source={{ uri: IMG.SPLASH }}
      />
    </View>
  );
};