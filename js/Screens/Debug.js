import React, {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {Platform, TVTextScrollView, ScrollView} from 'react-native';
import {Text, View} from 'react-native';
import {COLORS, DIMENSIONS} from '../Constants';
import {Header} from '../components';
import {formatBytes} from '../controllers/Debug';

const Debug = () => {
  const [info, setInfo] = useState(null);

  const normalizeText = (prop, res) => {
    const isMemOrDiskSize = res > 1000;
    const isObj = typeof res === 'object';

    if (isMemOrDiskSize) {
      res = formatBytes(res);
    }
    if (isObj) {
      res = JSON.stringify(res);
    }

    return <Text key={prop}>{`${prop}: ${res}\n`}</Text>;
  };

  const getAllPromises = () => {
    const allPromises = [];
    for (const prop in DeviceInfo) {
      if (DeviceInfo[prop]) {
        const func = DeviceInfo[prop];

        allPromises.push(Promise.resolve(func())
            .then((res) => normalizeText(prop, res))
            .catch((e) => console.log(e)),
        );
      }
    }
    return allPromises;
  };

  Promise.all(getAllPromises()).then((results) => {
    !info && setInfo(results);
  });

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
            {info}
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
