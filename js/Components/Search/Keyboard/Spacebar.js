import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image, Pressable} from 'react-native';

const Spacebar = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onPress={props.onPress}>
      <Image
        style={styles.image}
        source={{
          uri: isFocused ? 'focusedSpacebar.png' : 'unfocusedSpacebar.png',
        }}
      />
    </Pressable>
  );
};

const styles = {
  image: {
    width: 203,
    height: 65,
    margin: 2,
  },
};

export default Spacebar;

Spacebar.propTypes = {
  onPress: PropTypes.func.isRequired,
};
