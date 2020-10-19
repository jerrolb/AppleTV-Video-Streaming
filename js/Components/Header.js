import React from 'react';
import {Image, View} from 'react-native';
import {IMG} from '../Constants';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={{uri: IMG.LOGO}} />
    </View>
  );
};

const styles = {
  header: {
    width: '100%',
    height: 100,
    marginLeft: 80,
    zIndex: 1,
  },
  logo: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
  },
};

export default Header;
