import React from 'react';
import {Text, View} from 'react-native';

const Info = (props) => {
  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{props.info.title}</Text>
      <Text style={styles.infoDescription}>{props.info.description}</Text>
    </View>
  );
};

const styles = {
  info: {
    width: '100%',
    height: 225,
    marginLeft: 100,
  },
  infoDescription: {
    fontSize: 25,
    color: '#FFF',
  },
  infoTitle: {
    lineHeight: 100,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
};

export default Info;
