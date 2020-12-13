import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setIsHeaderFocused} from '../redux/actions/actions';
import {Text, View} from 'react-native';
import {TVEventHandler} from 'react-native';
import {COLORS, REMOTE} from '../Constants';
import {Pressable, TVMenuControl} from 'react-native';

const Popup = (props) => {
  const wrapper = useRef(null);
  const tvEventHandler = new TVEventHandler();
  const disable = () => tvEventHandler.disable();

  useEffect(() => {
    wrapper.current && wrapper.current.setNativeProps({
      hasTVPreferredFocus: true,
    });
    TVMenuControl.enableTVMenuKey();
    tvEventHandler.enable(tvEventHandler, (_, evt) => {
      const btn = evt && evt.eventType;
      if (btn === REMOTE.MENU) {
        props.clearPopup('');
      }
    });
    return () => {
      TVMenuControl.disableTVMenuKey();
      disable();
    };
  });

  return (
    <Pressable ref={wrapper} hasTVPreferredFocus={true}>
      <View style={styles.fullscreen}>
        <View style={styles.center}>
          <Text style={styles.popupText}>{props.popup}</Text>
        </View>
      </View>
    </Pressable>
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

export default connect(mapState, mapDispatch, null, {forwardRef: true})(Popup);

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
  popupText: {
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
};

Popup.propTypes = {
  popup: PropTypes.string.isRequired,
  clearPopup: PropTypes.func.isRequired,
};
