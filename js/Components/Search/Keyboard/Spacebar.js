import React, {useState} from 'react';
import {Image, TouchableHighlight} from 'react-native';

const Spacebar = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableHighlight
      onFocus={() => {
        setIsFocused(true);
        props.onFocused();
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onPress={props.onPress}>
      <Image
        style={{
          width: 203,
          height: 65,
          margin: 2,
        }}
        source={{
          uri: isFocused ? 'focusedSpacebar.png' : 'unfocusedSpacebar.png',
        }}
      />
    </TouchableHighlight>
  );
};

export default Spacebar;
