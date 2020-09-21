import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../Components';

export default Error = () => {
  return (
    <View style={styles.fullscreen}>
      <Header />
      <View style={styles.center}>
        <Text style={styles.errorText}>
          <Text>{'There was a problem getting your content!\n\n'}</Text>
          <Text>Contact </Text>
          <Text style={styles.bold}>info@nolachurch.com </Text>
          <Text>{'if the problem persists.\n\n'}</Text>
          <Text>Please click the touchpad to try again.</Text>
        </Text>
      </View>
    </View>
  );
};

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
