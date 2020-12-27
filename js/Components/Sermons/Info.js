import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {COLORS} from '../../Constants';

const Info = (props) => {
  return (
    <View style={styles.info}>
      <View style={styles.leftCover} />
      <View style={styles.spacer} />
      <Text style={styles.infoTitle}>{props.info.title}</Text>
      <View style={styles.spacer} />
      <Text style={styles.infoDescription}>{props.info.description}</Text>
    </View>
  );
};

const styles = {
  leftCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 70,
    height: 430,
    backgroundColor: COLORS.BLACK,
  },
  info: {
    width: 525,
    height: 425,
    paddingLeft: 70,
    zIndex: 2,
    backgroundColor: COLORS.BLACK,
  },
  infoDescription: {
    fontSize: 30,
    color: COLORS.WHITE,
    width: 450,
    height: 245,
  },
  infoTitle: {
    height: 100,
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    width: 450,
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
