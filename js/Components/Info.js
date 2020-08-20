import React from 'react';
import {Text, View} from 'react-native';
import {INFO, INFO_DESCRIPTION, INFO_TITLE} from '../Config/Styles.js';

const Info = props => {
  return (
    <View style={INFO}>
      <Text style={[INFO_TITLE, {color: props.infoTextColor}]}>
        {props.info.title}
      </Text>
      <Text style={[INFO_DESCRIPTION, {color: props.infoTextColor}]}>
        {props.info.description}
      </Text>
    </View>
  );
};

export default Info;
