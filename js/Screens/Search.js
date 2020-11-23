import React, {useRef} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Character from '../Components/Search/Keyboard/Character';
import Thumbnail from '../Components/Search/Thumbnail';
import Header from '../Components/Header';
import Video from 'react-native-video';
import * as Player from '../Controllers/Player';
import {
  setIsHeaderFocused,
  setShouldSermonsBeFocused,
  setIsReturningFromPlayer,
  setShouldSearchBeFocused
} from '../redux/actions/actions';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      value: '',
      title: '',
      description: '',
      matchedPlaylists: [],
      position: {
        colIndex: 0,
        rowIndex: 0,
      },
      isKeyboardFocused: false,
      isViewReady: false,
    };
    this.onCharacterFocused = this.onCharacterFocused.bind(this);
    this.restoreFocusReturningFromPlayer = this.restoreFocusReturningFromPlayer.bind(
      this,
    );
  }
  onCharacterFocused() {
    if (!this.state.isKeyboardFocused && !this.props.isReturningFromPlayer) {
      this.setState(
        {isKeyboardFocused: true},
        this.backspace.backspace.setNativeProps({hasTVPreferredFocus: true}),
      );
    }
  }
  restoreFocusReturningFromPlayer() {
    this.focusCurrentSearchThumbnail();
  }
  addOne(char) {
    this.setState(
      (prevState) => ({
        value: (prevState.value += char),
      }),
      () => this.getSearchResults(),
    );
  }
  addSpace() {
    this.setState(
      (prevState) => ({
        value: (prevState.value += ' '),
      }),
      () => this.getSearchResults(),
    );
  }
  clearOne() {
    this.setState(
      (prevState) => ({
        value: prevState.value.slice(0, -1),
      }),
      () => this.getSearchResults(),
    );
  }
  setInfo(title, desc) {
    this.setState({
      title: title,
      description: desc,
    });
  }
  getSearchResults() {
    let matchedPlaylists = [];
    let searchResults = [];
    let iter = 0;
    const playlists = this.props.playlists;
    const filterVideo = (video) => {
      if (
        video.title.toLowerCase().includes(this.state.value) ||
        video.description.toLowerCase().includes(this.state.value)
      ) {
        if (!searchResults[iter]) {
          searchResults[iter] = [];
          searchResults.push(video);
          if (!matchedPlaylists.includes(video.playlistTitle)) {
            matchedPlaylists.push(video.playlistTitle);
          }
        }
        if (searchResults[iter].length === 3) {
          ++iter;
          searchResults[iter] = [];
          searchResults[iter].push(video);
          if (!matchedPlaylists.includes(video.playlistTitle)) {
            matchedPlaylists.push(video.playlistTitle);
          }
        } else {
          searchResults[iter].push(video);
          if (!matchedPlaylists.includes(video.playlistTitle)) {
            matchedPlaylists.push(video.playlistTitle);
          }
        }
      }
      this.setState({matchedPlaylists: []}, () =>
        this.setState({matchedPlaylists: matchedPlaylists}),
      );
    };
    const searchPlaylist = (playlist) => {
      playlist.videos.forEach(filterVideo);
    };

    if (!this.state.value) {
      this.setState({
        searchResults: [],
        matchedPlaylists: [],
        title: '',
        description: '',
      });
      return;
    }
    playlists.forEach(searchPlaylist);
    this.setState({searchResults: searchResults});
  }

  renderAlphabet(start) {
    const letterRow = [];

    letterRow.push(
      <Character
        key={'space'}
        letter={'space'}
        onPress={() => this.addSpace()}
        onFocused={this.onCharacterFocused}
        restoreFocusReturningFromPlayer={this.restoreFocusReturningFromPlayer}
      />,
    );
    letterRow.push(
      <Character
        ref={(e) => (this.backspace = e)}
        key={'backspace'}
        letter={'backspace'}
        onPress={() => this.clearOne()}
        onFocused={this.onCharacterFocused}
        restoreFocusReturningFromPlayer={this.restoreFocusReturningFromPlayer}
      />,
    );

    for (let i = 0; i < 36; ++i) {
      const letter = (i + 10).toString(36);
      if (i > 25) {
        letter -= 9;
      }
      if (i === 35) {
        letter = 0;
      }
      letterRow.push(
        <Character
          key={letter}
          letter={letter}
          onPress={(char) => {
            this.addOne(char);
          }}
          onFocused={this.onCharacterFocused}
          restoreFocusReturningFromPlayer={this.restoreFocusReturningFromPlayer}
        />,
      );
    }
    return letterRow;
  }

  focusCurrentSearchThumbnail() {
    this[
      `${this.state.position.colIndex}${this.state.position.rowIndex}`
    ].thumbnail.setNativeProps({hasTVPreferredFocus: true});
  }

  render() {
    return (
      <View>
        <View
          style={[
            styles[this.props.player.visible ? 'hidden' : 'fullscreen'],
            {color: '#000'},
          ]}>
          <Header isSearch={true}/>

<View style={{paddingLeft: 70}}>
          <TouchableHighlight
            style={styles.focusInterceptWrapper}
            onFocus={() => {
              if (!this.state.isViewReady) {
                this.props.setShouldSearchBeFocused(true);
                this.setState({isViewReady: true});
                return;
              }

              if (this.props.isReturningFromPlayer) {
                this.props.setIsReturningFromPlayer(false);
                this.focusCurrentSearchThumbnail();
                return;
              }

              if (this.props.isHeaderFocused) {
                this.backspace.backspace.setNativeProps({
                  hasTVPreferredFocus: true,
                });
              } else {
                this.props.setShouldSearchBeFocused(true);
              }
              this.props.setIsHeaderFocused(!this.props.isHeaderFocused);

              if (this.state.isKeyboardFocused) {
                this.setState({isKeyboardFocused: false});
              }
            }}>
            <View style={styles.focusIntercept} />
          </TouchableHighlight>

          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 40,
              height: 50,
            }}>
            {this.state.value}
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: 430,
              height: 1200,
              flexWrap: 'wrap',
            }}>
            {this.renderAlphabet()}
          </View>

          <View style={{position: 'absolute', top: 550, left: 70, width: 450}}>
            <Text>
              <Text style={{color: 'white', fontSize: 25}}>
                {`${this.state.title} \n\n`}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: 100,
                  fontSize: 25,
                  height: 400,
                }}>
                {`${this.state.description} \n\n\n`}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  color: 'white',
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                {`${this.state.matchedPlaylists[0] || ''} \n\n`}
                {`${this.state.matchedPlaylists[1] || ''} \n\n`}
                {`${this.state.matchedPlaylists[2] || ''} \n\n`}
              </Text>
            </Text>
          </View>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 150,
              left: 550,
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
            }}>
            <Carousel
              ref={(e) => (this.playlistCol = e)}
              data={
                Array.isArray(this.state.searchResults)
                  ? this.state.searchResults
                  : []
              }
              vertical={true}
              activeSlideAlignment={'start'}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              removeClippedSubviews={true}
              renderItem={({item, index}) => {
                const reefer = index;
                return (
                  <Carousel
                    ref={(e) => {
                      this[`playlist${index}`] = e;
                    }}
                    activeSlideAlignment={'start'}
                    data={Array.isArray(item) ? item : []}
                    sliderWidth={2000}
                    sliderHeight={240}
                    itemWidth={430}
                    itemHeight={240}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    scrollEnabled={false}
                    removeClippedSubviews={true}
                    renderItem={({item, index}) => {
                      return (
                        <Thumbnail
                          ref={(e) => {
                            this[`${reefer}${index}`] = e;
                          }}
                          item={item}
                          index={index}
                          onFocused={() => {
                            if (this.state.isKeyboardFocused) {
                              this.setState({isKeyboardFocused: false});
                            }
                          }}
                          setInfo={(title, desc) => {
                            this.setInfo(title, desc);
                          }}
                          setPosition={(rowIndex) => {
                            this.setState({
                              position: {
                                colIndex: reefer,
                                rowIndex: rowIndex,
                              },
                            });
                          }}
                          restore={this.restoreFocusReturningFromPlayer}
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
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
            />
          </View>
        </View>
        {this.props.player.enabled && (
          <View hasTVPreferredFocus={this.props.player.visible}>
            <Video
              style={
                styles[this.props.player.visible ? 'fullscreen' : 'hidden']
              }
              source={{uri: this.props.player.url, type: 'm3u8'}}
              controls={this.props.player.visible}
              paused={this.props.player.paused}
              onEnd={Player.exit}
              onError={Player.error}
            />
          </View>
        )}
      </View>
    );
  }
}

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
