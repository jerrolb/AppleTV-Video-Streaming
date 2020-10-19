import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

const Info = (props) => {
  return (
    <View style={styles.info}>
      <View style={{height: 50}} />
      <Text style={styles.infoTitle}>{props.info.title}</Text>
      <View style={{height: 50}} />
      <Text style={styles.infoDescription}>{props.info.description}</Text>
    </View>
  );
};

const styles = {
  info: {
    width: '100%',
    height: 275,
    marginLeft: 100,
  },
  infoDescription: {
    fontSize: 25,
    color: '#FFF',
    width: 575,
  },
  infoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    width: 575,
  },
};

Info.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default Info;
