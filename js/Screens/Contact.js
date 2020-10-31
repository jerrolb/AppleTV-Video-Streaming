import React from 'react';
import {Image, View} from 'react-native';
import {Header} from '../Components';
import {IMG} from '../Constants';

const Contact = (props) => {
  return (
    <View style={styles.fullscreen}>
      <Header screen={'Contact'} />
      <Image style={styles.image} source={{uri: IMG.CONTACT}} />
    </View>
  );
};

export default Contact;

const styles = {
  image: {
    width: '100%',
    height: '100%',
    marginTop: -100,
  },
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
