import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../Components';

const Giving = (props) => {
  return (
    <View style={styles.fullscreen}>
      <Header
        screen={'Giving'}
        setScreen={props.setScreen}
        setIsHeaderFocused={props.setIsHeaderFocused}
      />
      <View style={styles.center}>
        <Text style={styles.errorText}>
          <Text>Giving with QR code</Text>
        </Text>
      </View>
    </View>
  );
};

export default Giving;

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
