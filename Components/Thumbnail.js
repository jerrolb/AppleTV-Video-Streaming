import React from 'react';
import { Image, View } from 'react-native';

export default Thumbnail = props => {
    return (
        <View
            ref={(e) => { this.foo = e; }}
            style={{
                width: 420,
                height: 230
            }}
        >
        <Image
            style={{
                width: 410,
                height: 220
            }}
            source={{uri: props.payload.thumbnail }}
        />
        </View>
    );
};