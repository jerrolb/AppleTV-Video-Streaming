import React from 'react';
import {connect} from 'react-redux';
import {Image, TouchableHighlight, View} from 'react-native';
import * as Player from '../../Controllers/Player';
import {setNextUrl} from '../../redux/actions/actions';

class Thumbnail extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
    };
  }

  onFocus() {
    this.props.setPosition(this.props.index);
    this.props.onFocused();
    this.props.setNextUrl(this.props.item.url);
    this.props.setInfo(this.props.item.title, this.props.item.description);
    this.setState({isFocused: true});
  }
  onBlur() {
    this.setState({isFocused: false});
  }

  render() {
    return (
      <TouchableHighlight
        ref={(e) => (this.thumbnail = e)}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        onPress={Player.init}>
        <View
          style={{
            width: 430,
            height: 240,
            borderWidth: 5,
            borderRadius: 5,
            borderColor: this.state.isFocused ? 'lightblue' : 'transparent',
          }}>
          <Image
            style={styles.thumbnailImage}
            source={{uri: this.props.item.thumbnail}}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

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
