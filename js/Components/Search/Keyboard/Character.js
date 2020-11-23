import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {setIsReturningFromPlayer} from '../../../redux/actions/actions';

class Character extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
    };
  }
  getChar(char) {
    if (char === ' ') {
      return '|___|';
    }
    if (!char && char !== 0) {
      return '<X';
    }
    return char;
  }
  render() {
    const isSpace = this.props.letter === 'space';
    const isBackspace = this.props.letter === 'backspace';
    const isNeither = !isSpace && !isBackspace;
    return (
      (isSpace && (
        <>
          <TouchableHighlight
            onFocus={() => {
              if (this.props.isReturningFromPlayer) {
                this.props.setIsReturningFromPlayer(false);
                this.props.restoreFocusReturningFromPlayer();
                return;
              }
              this.setState({isFocused: true});
              this.props.onFocused();
            }}
            onBlur={() => {
              this.setState({isFocused: false});
            }}
            onPress={() => {
              this.props.onPress(this.props.letter);
            }}>
            <Image
              style={{
                width: 203,
                height: 65,
                margin: 2,
              }}
              source={{
                uri: this.state.isFocused
                  ? 'focusedSpacebar.png'
                  : 'unfocusedSpacebar.png',
              }}
            />
          </TouchableHighlight>
        </>
      )) ||
      (isBackspace && (
        <TouchableHighlight
          ref={(e) => (this.backspace = e)}
          onFocus={() => {
            if (this.props.player.enabled) {
              this.props.restoreFocusReturningFromPlayer();
              return;
            }
            if (this.props.isReturningFromPlayer) {
              this.props.setIsReturningFromPlayer(false);
              this.props.restoreFocusReturningFromPlayer();
              return;
            }
            this.props.onFocused();
            this.setState({isFocused: true});
          }}
          onBlur={() => {
            this.setState({isFocused: false});
          }}
          onPress={() => {
            this.props.onPress(this.props.letter);
          }}>
          <Image
            style={{
              width: 203,
              height: 65,
              margin: 2,
            }}
            source={{
              uri: this.state.isFocused
                ? 'focusedBackspace.png'
                : 'unfocusedBackspace.png',
            }}
          />
        </TouchableHighlight>
      )) ||
      (isNeither && (
        <TouchableHighlight
          onFocus={() => {
            if (this.props.isReturningFromPlayer) {
              this.props.setIsReturningFromPlayer(false);
              this.props.restoreFocusReturningFromPlayer();
              return;
            }
            this.props.onFocused();
            this.setState({isFocused: true});
          }}
          onBlur={() => {
            this.setState({isFocused: false});
          }}
          onPress={() => {
            this.props.onPress(this.props.letter);
          }}>
          <View
            style={{
              width: 65,
              height: 65,
              backgroundColor: this.state.isFocused ? '#CECCCE' : '#181718',
              margin: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: this.state.isFocused ? '#1E1D1E' : '#787678',
                fontWeight: 'bold',
                fontSize: 30,
                textAlign: 'center',
              }}>
              {this.getChar(this.props.letter)}
            </Text>
          </View>
        </TouchableHighlight>
      ))
    );
  }
}

const styles = {};

const mapState = (state) => {
  return {
    isReturningFromPlayer: state.isReturningFromPlayer,
    player: state.player,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
  };
};

export default connect(mapState, mapDispatch, null, {forwardRef: true})(
  Character,
);
