import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Text, TouchableHighlight, View} from 'react-native';
import {setIsReturningFromPlayer} from '../../../redux/actions/actions';

const AlphaNumeric = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = {
    container: {
      width: 65,
      height: 65,
      backgroundColor: isFocused ? '#CECCCE' : '#181718',
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: isFocused ? '#1E1D1E' : '#787678',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
    },
  };

  return (
    <TouchableHighlight
      onFocus={() => {
        if (props.isReturningFromPlayer) {
          props.setIsReturningFromPlayer(false);
          props.restoreFocusReturningFromPlayer();
          return;
        }
        props.clearInfo();
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.alphaNumeric}</Text>
      </View>
    </TouchableHighlight>
  );
};

const mapState = (state) => {
  return {
    isReturningFromPlayer: state.isReturningFromPlayer,
    player: state.player,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
  };
};

export default connect(mapState, mapDispatch, null, {forwardRef: true})(
    AlphaNumeric,
);
