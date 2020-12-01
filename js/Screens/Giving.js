import React from 'react';
import {Image, View} from 'react-native';
import {Header} from '../components';
import {IMG} from '../Constants';

const Giving = (props) => {
  return (
    <View style={styles.fullscreen}>
      <Header screen={'Giving'} />
      <Image style={styles.image} source={{uri: IMG.GIVING}} />
    </View>
  );
};

export default Giving;

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
