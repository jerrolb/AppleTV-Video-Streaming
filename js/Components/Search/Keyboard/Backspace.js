import React, {useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {setIsReturningFromPlayer} from '../../../redux/actions/actions';

const Backspace = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableHighlight
      ref={ref}
      onFocus={() => {
        if (props.player.enabled && props.player.visible) {
          props.restoreFocusReturningFromPlayer();
          return;
        }
        if (props.isReturningFromPlayer) {
          props.setIsReturningFromPlayer(false);
          props.restoreFocusReturningFromPlayer();
          return;
        }
        props.clearInfo();
        props.onFocused();
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onPress={() => {
        props.onPress(props.letter);
      }}>
      <Image
        style={{
          width: 203,
          height: 65,
          margin: 2,
        }}
        source={{
          uri: isFocused ? 'focusedBackspace.png' : 'unfocusedBackspace.png',
        }}
      />
    </TouchableHighlight>
  );
});

const mapState = (state) => {
  return {
    player: state.player,
    isReturningFromPlayer: state.isReturningFromPlayer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
  };
};

export default connect(mapState, mapDispatch, null, {forwardRef: true})(
  Backspace,
);
