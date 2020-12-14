import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {setScreen} from '../redux/actions/actions';
import PropTypes from 'prop-types';
import {Text, Pressable, View} from 'react-native';
import {COLORS, DIMENSIONS, SCREEN} from '../Constants';

const Debug = (props) => {
  return (
    <View style={styles.fullscreen}>
      <View style={styles.center}>
        <Pressable
          hasTVPreferredFocus={true}
          onPress={() => props.setScreen(SCREEN.SERMONS)}
        >
          <Text style={styles.container}>
            <Text>{`Development Mode: ${__DEV__}\n`}</Text>
            <Text>
              {`Screen size: ${DIMENSIONS.WIDTH}x${DIMENSIONS.HEIGHT}\n\n`}
            </Text>
            <Text>{`${JSON.stringify(Platform)}\n\n`}</Text>
            <Text>{'Press select to return to app'}</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const mapDispatch = (dispatch) => {
  return {
    setScreen: (screen) => dispatch(setScreen(screen)),
  };
};

export default connect(null, mapDispatch)(Debug);

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
  container: {
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

Debug.propTypes = {
  setScreen: PropTypes.func.isRequired,
};
