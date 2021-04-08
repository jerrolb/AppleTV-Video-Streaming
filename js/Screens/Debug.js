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

    return {[prop]: res};
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
    results = results.reduce((all, result) => {
      if (result) {
        const key = Object.keys(result)[0];
        const val = Object.values(result)[0];
        all[key] = val;
      }
      return all;
    }, {});
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
              {`Screen size: ${DIMENSIONS.WIDTH}x${DIMENSIONS.HEIGHT}\n`}
            </Text>
            <Text>{`Version: ${info && info.getVersion || '...'}\n\n`}</Text>
            <Text>{`Platform: ${JSON.stringify(Platform)}\n\n`}</Text>
            {`Device Info: ${JSON.stringify(info, null, 2)}`}
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
    marginTop: 50,
    marginLeft: 50,
    fontSize: 15,
    color: COLORS.WHITE,
  },
};
