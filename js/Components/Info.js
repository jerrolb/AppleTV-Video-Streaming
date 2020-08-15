import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { globalContext } from '../App';

export default Info = () => {
  const info = useContext(globalContext).info;
  return (
    <View style={{
      width: '100%',
      height: 250,
      marginLeft: 30,
      backgroundColor: '#000'
    }}>
      <Text style={{
          lineHeight: 100,
          fontSize: 30,
          fontWeight: 'bold',
          color: '#FFF',
      }}>
        { info.title }
      </Text>
      <Text style={{
        color: '#FFF',
        fontSize: 25
      }}>
        { info.description }
      </Text>
    </View>
  );
}
