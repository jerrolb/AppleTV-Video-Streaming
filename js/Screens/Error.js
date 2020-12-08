import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableHighlight, View} from 'react-native';
import {COLORS} from '../Constants';

const Error = (props) => {
  return (
    <View style={styles.fullscreen}>
      <View style={styles.center}>
        <TouchableHighlight
          hasTVPreferredFocus={true}
          onPress={props.restartApp}
        >
          <Text style={styles.errorText}>
            <Text>{'There was a problem getting your content!\n\n'}</Text>
            <Text>Contact </Text>
            <Text style={styles.bold}>info@nolachurch.com </Text>
            <Text>{'if the problem persists.\n\n'}</Text>
            <Text>Press the touchpad to try again.</Text>
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Error;

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.WHITE,
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  bold: {
    fontWeight: 'bold',
  },
};

Error.propTypes = {
  restartApp: PropTypes.func.isRequired,
};
