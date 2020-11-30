import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import * as Player from '../../Controllers/Player';

const Thumbnail = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  const onPress = () => {
    if (props.isPopup) {
      props.setPopup(props.title);
    } else {
      Player.init(props.url);
    }
  };

  const styles = {
    container: {
      width: 410,
      height: 220,
    },
    text: {
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
    },
    thumbnail: {
      width: 430,
      height: 240,
      borderWidth: 5,
      borderRadius: 5,
      borderColor: isFocused ? 'lightblue' : 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPress}
      pointerEvents={props.pointerEvents}>
      <View pointerEvents={props.pointerEvents} style={styles.thumbnail}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Thumbnail;
