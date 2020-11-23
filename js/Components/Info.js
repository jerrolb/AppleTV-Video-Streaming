import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

const Info = (props) => {
  return (
    <View style={styles.info}>
      <View style={styles.leftCover} />
      <View style={styles.spacer} />
      <Text style={styles.infoTitle}>{props.info.title}</Text>
      <View style={styles.spacer} />
      <Text style={styles.infoDescription}>{props.info.description}</Text>
      {/* <View style={styles.cover}/> */}
    </View>
  );
};

const styles = {
  leftCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 70,
    height: 420,
    backgroundColor: 'black',
  },
  info: {
    width: '100%',
    height: 425,
    paddingLeft: 70,
    zIndex: 2,
  },
  infoDescription: {
    fontSize: 35,
    color: '#FFF',
    width: 600,
    backgroundColor: 'black',
    height: 245,
  },
  infoTitle: {
    height: 100,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    width: 600,
    backgroundColor: 'black',
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
