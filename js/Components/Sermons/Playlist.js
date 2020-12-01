import React, {useEffect, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';
import {Text, Image, View, TouchableHighlight} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {DIMENSIONS} from '../../Constants';
import * as Player from '../../controllers/Player';

const Playlist = React.forwardRef((props, ref) => {
  const refArr = useRef([]);
  const playlistRow = useRef(null);
  const renderThumbnail = ({item, index}) => (
    <TouchableHighlight
      ref={(e) => (refArr.current[index] = e)}
      style={styles.marginLeft}
      onFocus={() => {
        props.setFocus(index);
      }}
      onPress={Player.playVideo}
    >
      <Image
        style={styles.thumbnailImage}
        source={{uri: item.thumbnail}}
      />
    </TouchableHighlight>
  );

  useImperativeHandle(ref, () => ({
    forceActiveFocus: (index) => {
      refArr.current[index].setNativeProps({hasTVPreferredFocus: true});
    },
    snapToItem: (index) => {
      playlistRow.current.snapToItem(index);
    },
  }));

  useEffect(() => {
    refArr.current = refArr.current.slice(0, props.videos.length);
  });

  return (
    <View style={styles.marginTop}>
      <Text style={styles.playlistText}>{props.title}</Text>
      <Carousel
        ref={playlistRow}
        data={props.videos}
        activeSlideAlignment={'start'}
        onSnapToItem={props.updateVideoInfo}
        renderItem={renderThumbnail}
        sliderWidth={DIMENSIONS.WIDTH}
        sliderHeight={300}
        itemWidth={430}
        itemHeight={210}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        removeClippedSubviews={true}
      />
    </View>
  );
});

export default Playlist;

Playlist.propTypes = {
  title: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = {
  playlistText: {
    marginLeft: 70,
    fontSize: 35,
    lineHeight: 100,
    fontWeight: 'bold',
    color: '#FFF',
  },
  marginLeft: {
    marginLeft: 90,
  },
  marginTop: {
    marginTop: 100,
  },
  thumbnailImage: {
    width: 410,
    height: 220,
  },
};
