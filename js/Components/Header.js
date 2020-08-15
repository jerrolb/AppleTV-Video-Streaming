import React from 'react';
import { Image, View } from 'react-native';
import { IMG } from '../Config/Constants.js';

export default Header = () => {
  return (
    <View style={{ width: '100%', height: 100, backgroundColor: '#000', marginLeft: 20 }}>
      <Image
        style={{ width: 400, height: 100, resizeMode: 'contain' }}
        source={{uri: IMG.LOGO}}
      />
    </View>
  );
};
