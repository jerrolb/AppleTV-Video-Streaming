import React from 'react';
import {Image, View} from 'react-native';
import {HEADER, LOGO} from '../Config/Styles.js';

const Header = props => {
  return (
    <View style={HEADER}>
      <Image style={LOGO} source={{uri: props.logo}} />
    </View>
  );
};

export default Header;
