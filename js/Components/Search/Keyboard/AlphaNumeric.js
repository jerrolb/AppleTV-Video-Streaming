import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, Pressable, View} from 'react-native';
import {setIsReturningFromPlayer} from '../../../redux/actions/actions';
import {COLORS} from '../../../Constants';

const AlphaNumeric = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = {
    container: {
      width: 65,
      height: 65,
      backgroundColor: COLORS.KEYBOARD[
        isFocused ? 'FOCUSED_BG' : 'UNFOCUSED_BG'
      ],
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: COLORS.KEYBOARD[isFocused ? 'FOCUSED_TEXT' : 'UNFOCUSED_TEXT'],
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
    },
  };

  const onFocus = () => {
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
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.alphaNumeric}</Text>
      </View>
    </Pressable>
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

AlphaNumeric.propTypes = {
  restoreFocusReturningFromPlayer: PropTypes.func.isRequired,
  setIsReturningFromPlayer: PropTypes.func.isRequired,
  isReturningFromPlayer: PropTypes.bool.isRequired,
  clearInfo: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  alphaNumeric: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};
