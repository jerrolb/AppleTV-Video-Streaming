import React from 'react';
import {connect} from 'react-redux';
import {
  setIsHeaderFocused,
  setScreen,
  setShouldSermonsBeFocused,
  setInfo,
  setNextUrl,
  setPosition,
  setIsAppLoaded,
} from '../redux/actions/actions';
import {Image, View, Text, TouchableHighlight} from 'react-native';
import {IMG} from '../Constants';

class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isSermons: false,
      isSearch: false,
    };
  }

  componentDidMount() {
    if (this.props.label === 'Sermons') {
      this.setState({isSermons: true});
    }
    if (this.props.label === 'Search') {
      this.SetState({isSearch: true});
    }
  }

  componentDidUpdate(prevProps) {
    const didFocusChange =
      prevProps.shouldSermonsBeFocused !== this.props.shouldSermonsBeFocused;
    if (
      didFocusChange &&
      this.state.isSermons &&
      this.props.shouldSermonsBeFocused
    ) {
      this.Sermons.setNativeProps({hasTVPreferredFocus: true});
    }
  }

  focus() {
    this.props.setIsHeaderFocused(true);
    this.setState({isFocused: true});
  }
  blur() {
    this.state.isSermons && this.props.setShouldSermonsBeFocused(false);
    this.setState({isFocused: false});
  }

  render() {
    const styles = {
      textStyle: {
        marginTop: 37,
        fontSize: 32,
        color: this.state.isFocused ? '#88c4dd' : '#F0F0F0',
        fontWeight: this.state.isFocused ? '800' : '700',
      },
      searchIcon: {
        marginTop: 32,
        width: this.state.isFocused ? 60 : 50,
        height: this.state.isFocused ? 60 : 50,
      },
      flexDirectionRow: {
        flexDirection: 'row',
      },
    };
    const isSearch = this.props.label === 'Search';

    return (
      <TouchableHighlight
        ref={(e) => {
          this[this.props.label] = e;
        }}
        onFocus={() => this.focus()}
        onBlur={() => this.blur()}
        onPress={() => {
          if (this.state.isSermons && this.props.screen !== this.props.label) {
            this.props.setIsAppLoaded(false);
            this.props.setInfo({
              title: this.props.firstVideo.title,
              description: this.props.firstVideo.description,
              thumbnail: this.props.firstVideo.thumbnail,
            });
            this.props.setNextUrl(this.props.firstVideo.url);
            this.props.setPosition({
              colIndex: 0,
              rowIndex: 0,
            });
          }
          this.props.setScreen(this.props.label);
        }}
        hasTVPreferredFocus={this.props.screen === this.props.label}
        underlayColor="none">
        {(isSearch && (
          <View style={styles.flexDirectionRow}>
            <Image
              style={styles.searchIcon}
              source={{
                uri:
                  this.props.screen === this.props.label
                    ? IMG.SEARCH_BLUE
                    : IMG.SEARCH,
              }}
            />
            <Text> </Text>
          </View>
        )) || (
          <Text style={styles.textStyle}>
            {this.props.label +
              `${this.props.label !== 'Contact' ? '     ' : ''}`}
          </Text>
        )}
      </TouchableHighlight>
    );
  }
}

const mapState = (state) => {
  return {
    screen: state.screen,
    shouldSermonsBeFocused: state.shouldSermonsBeFocused,
    firstVideo: state.playlists[0].videos[0],
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsHeaderFocused: (isHeaderFocused) =>
      dispatch(setIsHeaderFocused(isHeaderFocused)),
    setScreen: (screen) => dispatch(setScreen(screen)),
    setShouldSermonsBeFocused: (shouldSermonsBeFocused) =>
      dispatch(setShouldSermonsBeFocused(shouldSermonsBeFocused)),
    setInfo: (info) => dispatch(setInfo(info)),
    setNextUrl: (nextUrl) => dispatch(setNextUrl(nextUrl)),
    setPosition: (position) => dispatch(setPosition(position)),
    setIsAppLoaded: (isAppLoaded) => dispatch(setIsAppLoaded(isAppLoaded)),
  };
};

export default connect(mapState, mapDispatch, null, {forwardRef: true})(Tab);
