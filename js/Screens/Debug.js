import React from 'react';
import {Platform, TVTextScrollView, ScrollView} from 'react-native';
import {Text, View} from 'react-native';
import {COLORS, DIMENSIONS} from '../Constants';
import {Header} from '../components';

const Debug = () => {
  return (
    <View style={styles.fullscreen}>
      <Header />
      <TVTextScrollView>
        <ScrollView>
          <Text style={styles.container}>
            <Text>{`Development Mode: ${__DEV__}\n`}</Text>
            <Text>
              {`Screen size: ${DIMENSIONS.WIDTH}x${DIMENSIONS.HEIGHT}\n\n`}
            </Text>
            <Text>{`${JSON.stringify(Platform, null, 4)}\n\n`}</Text>
          </Text>
        </ScrollView>
      </TVTextScrollView>
    </View>
  );
};

export default Debug;

const styles = {
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
  container: {
    marginTop: 100,
    marginLeft: 100,
    fontSize: 30,
    color: COLORS.WHITE,
  },
};
