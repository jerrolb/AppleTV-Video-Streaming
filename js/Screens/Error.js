import React from 'react';
import {Text, View} from 'react-native';
import {BOLD, CENTER, ERRORTEXT, FILLSCREEN} from '../Config/Styles.js';
import {Header} from '../Components';

export default (Error = () => {
  return (
    <View style={FILLSCREEN}>
      <Header />
      <View style={CENTER}>
        <Text style={ERRORTEXT}>
          <Text>{'There was a problem getting your content!\n\n'}</Text>
          <Text>Contact </Text>
          <Text style={BOLD}>info@nolachurch.com </Text>
          <Text>{'if the problem persists.\n\n'}</Text>
          <Text>Please click the touchpad to try again.</Text>
        </Text>
      </View>
    </View>
  );
});
