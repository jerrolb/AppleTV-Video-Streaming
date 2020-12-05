import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setIsHeaderFocused} from '../redux/actions/actions';
import {Text, View} from 'react-native';
import {TVEventHandler} from 'react-native';
import {REMOTE} from '../Constants';
import {TouchableHighlight, TVMenuControl} from 'react-native';

const Popup = (props) => {
  const invisible = useRef(null);
  const tvEventHandler = new TVEventHandler();
  const disable = () => tvEventHandler.disable();

  useEffect(() => {
    invisible.current && invisible.current.setNativeProps({
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
    <TouchableHighlight ref={invisible} hasTVPreferredFocus={true}>
      <View style={styles.fullscreen}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{props.popup}</Text>
        </View>
      </View>
    </TouchableHighlight>
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

Popup.propTypes = {
  popup: PropTypes.string.isRequired,
  clearPopup: PropTypes.func.isRequired,
};
