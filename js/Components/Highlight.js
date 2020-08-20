import React from 'react';
import {View} from 'react-native';
import {HIGHLIGHT} from '../Config/Styles.js';

const Highlight = props => {
  return <View style={[HIGHLIGHT, {borderColor: props.highlightColor}]} />;
};

export default Highlight;
