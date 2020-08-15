import React from 'react';
import { Text, View } from 'react-native';
import { BODY, ERRORTEXT } from '../Config/Styles.js'
import { Header } from '../Components';

export default class Error extends React.Component {
  render() {
    return (
      <View style={BODY}>
        <Header/>
        <Text style={ERRORTEXT}>
          <Text>{ `There was a problem getting your content!\n\n` }</Text>
          <Text>Contact </Text>
          <Text style={{fontWeight: 'bold'}}>info@nolachurch.com </Text>
          <Text>{ `if the problem persists.\n\n` }</Text>
          <Text>Please click the touchpad to try again.</Text>
        </Text>
      </View>
    );
  }
}