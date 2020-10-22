import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../Components';

const Contact = (props) => {
  return (
    <View style={styles.fullscreen}>
      <Header
        screen={'Contact'}
        setScreen={props.setScreen}
        setIsHeaderFocused={props.setIsHeaderFocused}
      />
      <View style={styles.center}>
        <Text style={styles.errorText}>
          <Text>Contact with QR code</Text>
        </Text>
      </View>
    </View>
  );
};

export default Contact;

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
