import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setIsHeaderFocused} from '../redux/actions/actions';
import {Text, View} from 'react-native';
import {TVEventHandler} from 'react-native';
import {REMOTE} from '../Constants';
import {TVMenuControl} from 'react-native';

const Popup = (props) => {
  const tvEventHandler = new TVEventHandler();
  const disable = () => tvEventHandler.disable();

  useEffect(() => {
    TVMenuControl.enableTVMenuKey();
    tvEventHandler.enable(this, (_, evt) => {
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
    <View style={styles.fullscreen}>
      <View style={styles.center}>
        <Text style={styles.errorText}>{props.popup}</Text>
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
