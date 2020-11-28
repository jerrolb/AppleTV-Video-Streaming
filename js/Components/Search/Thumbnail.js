import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Image, TouchableHighlight, View} from 'react-native';
import * as Player from '../../Controllers/Player';
import {setNextUrl} from '../../redux/actions/actions';

const Thumbnail = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    props.onFocused({
      title: props.item.title,
      desc: props.item.description,
      currRowIndex: props.index,
    });
    props.setNextUrl(props.item.url);
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableHighlight
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={() => {
        props.player.url === props.player.nextUrl
          ? Player.resume()
          : Player.init();
      }}>
      <View
        style={{
          width: 430,
          height: 240,
          borderWidth: 5,
          borderRadius: 5,
          borderColor: isFocused ? 'lightblue' : 'transparent',
        }}>
        <Image
          style={styles.thumbnailImage}
          source={{uri: props.item.thumbnail}}
        />
      </View>
    </TouchableHighlight>
  );
});

const styles = {
  thumbnailImage: {
    width: 410,
    height: 220,
    marginLeft: 5,
    marginTop: 5,
  },
};

const mapState = (state) => {
  return {
    isReturningFromPlayer: state.isReturningFromPlayer,
    player: state.player,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setNextUrl: (nextUrl) => dispatch(setNextUrl(nextUrl)),
  };
};

export default connect(mapState, mapDispatch, null, {forwardRef: true})(
  Thumbnail,
);
