import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

const Info = (props) => {
  return (
    <View style={styles.info}>
      <View style={styles.spacer} />
      <Text style={styles.infoTitle}>{props.info.title}</Text>
      <View style={styles.spacer} />
      <Text style={styles.infoDescription}>{props.info.description}</Text>
    </View>
  );
};

const styles = {
  info: {
    width: '100%',
    height: 295,
    marginLeft: 90,
  },
  infoDescription: {
    fontSize: 35,
    color: '#FFF',
    width: 600,
  },
  infoTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    width: 600,
  },
  spacer: {
    height: 40,
  },
};

Info.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

const mapState = (state) => {
  return {
    info: state.info,
  };
};

export default connect(mapState)(Info);
