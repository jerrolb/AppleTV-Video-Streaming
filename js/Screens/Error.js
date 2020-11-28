import React from 'react';
import {connect} from 'react-redux';
import {setIsHeaderFocused} from '../redux/actions/actions';
import {Text, TouchableHighlight, View} from 'react-native';

const Error = (props) => {
  return (
    <View style={styles.fullscreen}>
      <View style={styles.center}>
        <Text style={styles.errorText}>
          <Text>{'There was a problem getting your content!\n\n'}</Text>
          <Text>Contact </Text>
          <Text style={styles.bold}>info@nolachurch.com </Text>
          <Text>{'if the problem persists.\n\n'}</Text>
          <Text>Press the touchpad to try again.</Text>
          <TouchableHighlight
            hasTVPreferredFocus={true}
            onFocus={() => props.setIsHeaderFocused(false)}
            onPress={props.restart}>
            <Text />
          </TouchableHighlight>
        </Text>
      </View>
    </View>
  );
};

const mapState = (state) => {
  return {
    shouldRetryBeFocused: state.shouldRetryBeFocused,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsHeaderFocused: (isHeaderFocused) =>
      dispatch(setIsHeaderFocused(isHeaderFocused)),
  };
};

export default connect(mapState, mapDispatch, null, {forwardRef: true})(Error);

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
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
