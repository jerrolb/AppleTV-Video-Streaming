import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {
  setIsReturningFromPlayer,
  setIsHeaderFocused,
} from '../../../redux/actions/actions';

const Backspace = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    props.setIsHeaderFocused(false);
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
    <Pressable
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={props.onPress}>
      <Image
        style={styles.image}
        source={{
          uri: isFocused ? 'focusedBackspace.png' : 'unfocusedBackspace.png',
        }}
      />
    </Pressable>
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
    setIsHeaderFocused: (isHeaderFocused) =>
      dispatch(setIsHeaderFocused(isHeaderFocused)),
  };
};

Backspace.displayName = 'Backspace';
export default connect(mapState, mapDispatch, null, {forwardRef: true})(
    Backspace,
);

Backspace.propTypes = {
  onPress: PropTypes.func.isRequired,
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
  restoreFocusReturningFromPlayer: PropTypes.func.isRequired,
  setIsReturningFromPlayer: PropTypes.func.isRequired,
  isReturningFromPlayer: PropTypes.bool.isRequired,
  setIsHeaderFocused: PropTypes.func.isRequired,
  clearInfo: PropTypes.func.isRequired,
};
