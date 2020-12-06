import React, {useCallback, useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, TouchableHighlight, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AlphaNumeric from '../components/Search/Keyboard/AlphaNumeric';
import Spacebar from '../components/Search/Keyboard/Spacebar';
import Backspace from '../components/Search/Keyboard/Backspace';
import Thumbnail from '../components/Search/Thumbnail';
import Header from '../components/Header/Header';
import Video from 'react-native-video';
import * as Player from '../controllers/Player';
import {
  setIsHeaderFocused,
  setShouldSermonsBeFocused,
  setIsReturningFromPlayer,
  setShouldSearchBeFocused,
} from '../redux/actions/actions';

const Search = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [matchedPlaylists, setMatchedPlaylists] = useState([]);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [isViewReady, setIsViewReady] = useState(false);
  const [position, setPosition] = useState({
    colIndex: 0,
    rowIndex: 0,
  });

  const playlistCol = useRef(null);
  const playlistRowRefs = useRef([]);
  const thumbnailRefs = useRef([]);
  const backspace = useRef(null);

  const restoreFocusReturningFromPlayer = () => {
    props.setIsReturningFromPlayer(false);
    focusCurrentSearchThumbnail();
  };

  const addOne = (char) => {
    const newInput = input.slice() + char;
    setInput(newInput);
  };

  const addSpace = () => {
    const newInput = input.slice() + ' ';
    if (!input) {
      return;
    }
    setInput(newInput);
  };

  const clearOne = () => {
    const newInput = input.slice(0, -1);
    setInput(newInput);
  };

  const setInfo = (newTitle, newDescription) => {
    setTitle(newTitle);
    setDescription(newDescription);
  };

  const getSearchResults = useCallback(() => {
    const newMatchedPlaylists = [];
    const newSearchResults = [];
    let iter = 0;
    const playlists = props.playlists;
    const filterVideo = (video) => {
      if (
        video.title.toLowerCase().includes(input) ||
        video.description.toLowerCase().includes(input) ||
        video.playlistTitle.toLowerCase().includes(input)
      ) {
        if (!newSearchResults[iter]) {
          newSearchResults[iter] = [];
          newSearchResults.push(video);
          if (!newMatchedPlaylists.includes(video.playlistTitle)) {
            newMatchedPlaylists.push(video.playlistTitle);
          }
        }
        if (newSearchResults[iter].length === 3) {
          ++iter;
          newSearchResults[iter] = [];
          newSearchResults[iter].push(video);
          if (!newMatchedPlaylists.includes(video.playlistTitle)) {
            newMatchedPlaylists.push(video.playlistTitle);
          }
        } else {
          newSearchResults[iter].push(video);
          if (!newMatchedPlaylists.includes(video.playlistTitle)) {
            newMatchedPlaylists.push(video.playlistTitle);
          }
        }
      }
      setMatchedPlaylists([]);
      setMatchedPlaylists(newMatchedPlaylists);
    };
    const searchPlaylist = (playlist) => {
      playlist.videos.forEach(filterVideo);
    };

    if (!input) {
      setSearchResults([]);
      setMatchedPlaylists([]);
      setTitle('');
      setDescription('');
      return;
    }
    playlists.forEach(searchPlaylist);
    setSearchResults(newSearchResults);
  }, [input, props.playlists]);

  const renderKeyboard = () => {
    const letterRow = [
      <Spacebar
        key={'space'}
        onPress={() => addSpace()}
        restoreFocusReturningFromPlayer={restoreFocusReturningFromPlayer}
      />,
      <Backspace
        ref={backspace}
        key={'backspace'}
        onPress={() => clearOne()}
        restoreFocusReturningFromPlayer={restoreFocusReturningFromPlayer}
        clearInfo={() => setInfo('', '')}
      />,
    ];

    for (let i = 0; i < 36; ++i) {
      let alphaNumeric = (i + 10).toString(36);
      alphaNumeric = i === 35 ? 0 : i > 25 ? alphaNumeric - 9 : alphaNumeric;
      letterRow.push(
          <AlphaNumeric
            key={alphaNumeric}
            alphaNumeric={alphaNumeric}
            onPress={() => addOne(alphaNumeric)}
            restoreFocusReturningFromPlayer={restoreFocusReturningFromPlayer}
            clearInfo={() => setInfo('', '')}
          />,
      );
    }

    return letterRow;
  };

  const focusCurrentSearchThumbnail = () => {
    thumbnailRefs.current[
        `${position.colIndex}${position.rowIndex}`
    ].setNativeProps({hasTVPreferredFocus: true});
  };

  const getMatchedPlaylists = () => {
    const playlists = [];
    const addPlaylist = (playlist) => {
      playlists.push(<Text key={playlist}>{`${playlist} \n`}</Text>);
    };
    matchedPlaylists.forEach(addPlaylist);
    return playlists;
  };

  const getNumOfVideos = () => {
    return props.playlists.reduce((acc, curr) => {
      return (acc += curr.videos.length);
    }, 0);
  };

  const numOfVideos = getNumOfVideos();
  const numOfPlaylists = searchResults.length;

  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, numOfVideos);
    playlistRowRefs.current = playlistRowRefs.current.slice(0, numOfPlaylists);
    getSearchResults();
  }, [
    input,
    thumbnailRefs,
    playlistRowRefs,
    numOfVideos,
    numOfPlaylists,
    getSearchResults,
  ]);

  const onFocusInterceptFocused = () => {
    if (!isViewReady) {
      props.setShouldSearchBeFocused(true);
      setIsViewReady(true);
      return;
    }

    if (props.isReturningFromPlayer) {
      props.setIsReturningFromPlayer(false);
      focusCurrentSearchThumbnail();
      return;
    }

    if (props.isHeaderFocused) {
      backspace.current.setNativeProps({
        hasTVPreferredFocus: true,
      });
    } else {
      props.setShouldSearchBeFocused(true);
    }
    props.setIsHeaderFocused(!props.isHeaderFocused);
    isKeyboardFocused && setIsKeyboardFocused(false);
  };

  return (
    <View>
      <View style={styles[props.player.visible ? 'hidden' : 'fullscreen']}>
        <Header />

        <View style={styles.leftSide}>
          <TouchableHighlight
            style={styles.focusInterceptWrapper}
            onFocus={onFocusInterceptFocused}
          >
            <View style={styles.focusIntercept} />
          </TouchableHighlight>

          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={styles.userInput}>
            {input}
          </Text>

          <View style={styles.keyboard}>{renderKeyboard()}</View>

          <View style={styles.info}>
            <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.title}>{`${title}`}</Text>
            <Text ellipsizeMode={'tail'} numberOfLines={5} style={styles.description}>{`${description}`}</Text>
            <Text style={styles.matchedPlaylists}>
              {getMatchedPlaylists()}
            </Text>
          </View>
        </View>
        <View style={styles.searchResults}>
          <Carousel
            ref={playlistCol}
            data={Array.isArray(searchResults) ? searchResults : []}
            vertical={true}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            removeClippedSubviews={true}
            renderItem={({item: colItem, index: colIndex}) => {
              return (
                <Carousel
                  ref={(e) => {
                    playlistRowRefs.current[colIndex] = e;
                  }}
                  activeSlideAlignment={'start'}
                  data={Array.isArray(colItem) ? colItem : []}
                  sliderWidth={2000}
                  sliderHeight={240}
                  itemWidth={430}
                  itemHeight={240}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  scrollEnabled={false}
                  removeClippedSubviews={true}
                  renderItem={({item: rowItem, index: rowIndex}) => {
                    return (
                      <Thumbnail
                        ref={(e) => {
                          thumbnailRefs.current[`${colIndex}${rowIndex}`] = e;
                        }}
                        item={rowItem}
                        index={rowIndex}
                        onFocused={({newTitle, newDesc, currRowIndex}) => {
                          setPosition({
                            colIndex: colIndex,
                            rowIndex: currRowIndex,
                          });
                          isKeyboardFocused && setIsKeyboardFocused(false);
                          setInfo(newTitle, newDesc);
                        }}
                      />
                    );
                  }}
                />
              );
            }}
            sliderWidth={2000}
            sliderHeight={2000}
            itemWidth={1000}
            itemHeight={240}
          />
        </View>
      </View>
      {props.player.enabled && (
        <View hasTVPreferredFocus={props.player.visible}>
          <Video
            style={styles[props.player.visible ? 'fullscreen' : 'hidden']}
            source={{uri: props.player.url, type: 'm3u8'}}
            controls={props.player.visible}
            paused={props.player.paused}
            onEnd={Player.exit}
            onError={Player.error}
          />
        </View>
      )}
    </View>
  );
};

const styles = {
  thumbnailImage: {
    width: 410,
    height: 220,
  },
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  hidden: {
    position: 'absolute',
    top: '150%',
    left: '150%',
    width: 0,
    height: 0,
  },
  leftSide: {
    paddingLeft: 70,
    width: '100%',
    height: '100%',
  },
  focusIntercept: {
    position: 'absolute',
    left: 0,
    height: 1,
    width: '100%',
    paddingTop: 1,
  },
  focusInterceptWrapper: {
    height: 1,
    width: '100%',
  },
  userInput: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    height: 50,
    marginLeft: 10,
    width: 430,
  },
  keyboard: {
    flex: 1,
    flexDirection: 'row',
    width: 430,
    height: 1200,
    flexWrap: 'wrap',
  },
  info: {
    position: 'absolute',
    top: 550,
    left: 70,
    width: 450,
  },
  title: {
    color: 'white',
    fontSize: 25,
    width: 425,
  },
  description: {
    color: 'white',
    marginTop: 20,
    fontSize: 25,
    width: 425,
  },
  searchResults: {
    position: 'absolute',
    top: 125,
    left: 550,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  matchedPlaylists: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    width: 425,
    marginTop: 20,
  },
};

const mapState = (state) => {
  return {
    playlists: state.playlists,
    player: state.player,
    isReturningFromPlayer: state.isReturningFromPlayer,
    isHeaderFocused: state.isHeaderFocused,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setIsHeaderFocused: (isHeaderFocused) =>
      dispatch(setIsHeaderFocused(isHeaderFocused)),
    setShouldSermonsBeFocused: (shouldSermonsBeFocused) =>
      dispatch(setShouldSermonsBeFocused(shouldSermonsBeFocused)),
    setShouldSearchBeFocused: (shouldSearchBeFocused) =>
      dispatch(setShouldSearchBeFocused(shouldSearchBeFocused)),
    setIsReturningFromPlayer: (isReturningFromPlayer) =>
      dispatch(setIsReturningFromPlayer(isReturningFromPlayer)),
  };
};

export default connect(mapState, mapDispatch)(Search);

Search.propTypes = {
  isReturningFromPlayer: PropTypes.bool.isRequired,
  setIsReturningFromPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
  isHeaderFocused: PropTypes.bool.isRequired,
  setIsHeaderFocused: PropTypes.func.isRequired,
  setShouldSearchBeFocused: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
};
