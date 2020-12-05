import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  setIsHeaderFocused,
  setScreen,
  setShouldSermonsBeFocused,
  setShouldSearchBeFocused,
  setShouldWatchLiveBeFocused,
  setInfo,
  setNextUrl,
  setPosition,
  setIsAppLoaded,
} from '../../redux/actions/actions';
import {Image, View, Text, TouchableHighlight} from 'react-native';
import {IMG} from '../../Constants';

const Tab = React.forwardRef((props, ref) => {
  const isSermons = props.label === 'Sermons';
  const isSearch = props.label === 'Search';
  const isContact = props.label === 'Contact';
  const isWatchLive = props.label === 'Watch Live';
  const [isFocused, setIsFocused] = useState(false);
  const thisRef = useRef(ref);

  useEffect(() => {
    props.shouldSermonsBeFocused &&
      isSermons &&
      thisRef.current.setNativeProps({hasTVPreferredFocus: true});
    props.shouldSearchBeFocused &&
      isSearch &&
      thisRef.current.setNativeProps({hasTVPreferredFocus: true});
    props.shouldWatchLiveBeFocused &&
      isWatchLive &&
      thisRef.current.setNativeProps({hasTVPreferredFocus: true});
  }, [
    props.shouldSermonsBeFocused,
    props.shouldSearchBeFocused,
    props.shouldWatchLiveBeFocused,
    isSearch,
    isSermons,
    isWatchLive,
  ]);

  const focus = () => {
    props.setIsHeaderFocused(true);
    setIsFocused(true);
  };
  const blur = () => {
    isSermons && props.setShouldSermonsBeFocused(false);
    isSearch && props.setShouldSearchBeFocused(false);
    isWatchLive && props.setShouldWatchLiveBeFocused(false);
    setIsFocused(false);
  };
  const SearchTab = () => (
    <View style={styles.flexDirectionRow}>
      <Image
        style={styles.searchIcon}
        source={{
          uri: IMG[isFocused ? 'SEARCH_BLUE' : 'SEARCH'],
        }}
      />
    </View>
  );
  const TextTab = () => <Text style={styles.textStyle}>{props.label}</Text>;

  const styles = {
    textStyle: {
      marginTop: 37,
      marginRight: isContact ? 0 : 30,
      fontSize: 32,
      color: isFocused ? '#88c4dd' : '#F0F0F0',
      fontWeight: isFocused ? '800' : '700',
    },
    searchIcon: {
      resizeMode: 'contain',
      marginTop: 35,
      width: 45,
      height: 40,
    },
    flexDirectionRow: {
      flexDirection: 'row',
      marginRight: isContact ? 0 : 30,
    },
  };

  return (
    <TouchableHighlight
      ref={thisRef}
      onFocus={focus}
      onBlur={blur}
      onPress={() => {
        if (isSermons && props.screen !== props.label) {
          props.setIsAppLoaded(false);
          props.setInfo({
            title: props.firstVideo.title,
            description: props.firstVideo.description,
            thumbnail: props.firstVideo.thumbnail,
            background: props.firstVideo.background,
          });
          props.setNextUrl(props.firstVideo.url);
          props.setPosition({
            colIndex: 0,
            rowIndex: 0,
          });
        }
        props.setScreen(props.label);
      }}
      hasTVPreferredFocus={props.screen === props.label}
      underlayColor="none">
      {isSearch ? <SearchTab /> : <TextTab />}
    </TouchableHighlight>
  );
});

const mapState = (state) => {
  return {
    screen: state.screen,
    shouldSermonsBeFocused: state.shouldSermonsBeFocused,
    shouldSearchBeFocused: state.shouldSearchBeFocused,
    shouldWatchLiveBeFocused: state.shouldWatchLiveBeFocused,
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
    setShouldSearchBeFocused: (shouldSearchBeFocused) =>
      dispatch(setShouldSearchBeFocused(shouldSearchBeFocused)),
    setShouldWatchLiveBeFocused: (shouldWatchLiveBeFocused) =>
      dispatch(setShouldWatchLiveBeFocused(shouldWatchLiveBeFocused)),
    setInfo: (info) => dispatch(setInfo(info)),
    setNextUrl: (nextUrl) => dispatch(setNextUrl(nextUrl)),
    setPosition: (position) => dispatch(setPosition(position)),
    setIsAppLoaded: (isAppLoaded) => dispatch(setIsAppLoaded(isAppLoaded)),
  };
};

Tab.displayName = 'Tab';
export default connect(mapState, mapDispatch, null, {forwardRef: true})(Tab);

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  setShouldSermonsBeFocused: PropTypes.func.isRequired,
  shouldSermonsBeFocused: PropTypes.bool.isRequired,
  setShouldSearchBeFocused: PropTypes.func.isRequired,
  shouldSearchBeFocused: PropTypes.bool.isRequired,
  setShouldWatchLiveBeFocused: PropTypes.func.isRequired,
  shouldWatchLiveBeFocused: PropTypes.bool.isRequired,
  setIsAppLoaded: PropTypes.func.isRequired,
  setInfo: PropTypes.func.isRequired,
  firstVideo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
  }),
  setIsHeaderFocused: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
  setScreen: PropTypes.func.isRequired,
  setNextUrl: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};
