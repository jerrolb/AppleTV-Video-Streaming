import React, {useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {setIsReturningFromPlayer} from '../../../redux/actions/actions';

const Backspace = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
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
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableHighlight
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={() => {
        props.onPress(props.letter);
      }}>
      <Image
        style={styles.image}
        source={{
          uri: isFocused ? 'focusedBackspace.png' : 'unfocusedBackspace.png',
        }}
      />
    </TouchableHighlight>
  );
});

const styles = {
  image: {
    width: 203,
    height: 65,
    margin: 2,
  },
};

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
