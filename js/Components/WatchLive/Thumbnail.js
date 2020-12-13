import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
// import * as Player from '../../controllers/Player';
import {COLORS} from '../../Constants';

const Thumbnail = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    false && setIsFocused(false);
  }, [isFocused]);
  // const onFocus = () => {
  //   setIsFocused(true);
  //   props.setPosition();
  // };
  // const onBlur = () => {
  //   setIsFocused(false);
  // };
  // const onPress = () => {
  //   if (props.isPopup) {
  //     props.setPopup(props.title);
  //   } else {
  //     Player.init(props.url);
  //   }
  // };

  const styles = {
    container: {
      width: 410,
      height: 220,
    },
    text: {
      color: COLORS.WHITE,
      fontSize: 35,
      fontWeight: 'bold',
    },
    thumbnail: {
      width: 430,
      height: 240,
      borderWidth: 5,
      borderRadius: 5,
      borderColor: COLORS[isFocused ? 'LIGHT_BLUE' : 'GRAY'],
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    // <Pressable
    //   ref={ref}
    //   style={styles.container}
    //   onFocus={onFocus}
    //   onBlur={onBlur}
    //   onPress={onPress}
    // >
    <View style={styles.thumbnail}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
    // </Pressable>
  );
});

Thumbnail.displayName = 'Thumbnail';
export default Thumbnail;

Thumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  isPopup: PropTypes.bool.isRequired,
  setPopup: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
};
