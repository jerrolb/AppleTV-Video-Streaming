import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Image, TouchableHighlight, View} from 'react-native';
import * as Player from '../../controllers/Player';
import {setNextUrl} from '../../redux/actions/actions';

const Thumbnail = React.forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    props.onFocused({
      newTitle: props.item.title,
      newDesc: props.item.description,
      currRowIndex: props.index,
    });
    props.setNextUrl(props.item.url);
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  const styles = {
    thumbnailImage: {
      width: 410,
      height: 220,
      marginLeft: 5,
      marginTop: 5,
    },
    highlight: {
      width: 430,
      height: 240,
      borderWidth: 5,
      borderRadius: 5,
      borderColor: isFocused ? 'lightblue' : 'transparent',
    },
  };

  return (
    <TouchableHighlight
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={Player.playVideo}>
      <View style={styles.highlight}>
        <Image
          style={styles.thumbnailImage}
          source={{uri: props.item.thumbnail}}
        />
      </View>
    </TouchableHighlight>
  );
});

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

Thumbnail.displayName = 'Thumbnail';
export default connect(mapState, mapDispatch, null, {forwardRef: true})(
    Thumbnail,
);

Thumbnail.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }),
  onFocused: PropTypes.func.isRequired,
  setNextUrl: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
