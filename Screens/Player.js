import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { TVMenuControl } from 'react-native';
import { BODY, VIDEO } from '../Styles.js';

export default class Player extends React.Component {
    componentDidMount() {
        TVMenuControl.enableTVMenuKey();
    }
    componentWillUnmount() {
        TVMenuControl.disableTVMenuKey();
    }
    render() {
          const fullScreen = {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          };
        return (
            <Video
                // ref={e => this.player = e}
                style={fullScreen}
                source={{uri: 'https://nolachurch.com/stream/master.m3u8', type: 'm3u8'}}
                // controls={true}
                // onBuffer={this.onBuffer}
                // onError={this.videoError}
            />
        );
    }
}