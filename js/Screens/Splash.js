import React from 'react';
import {Image} from 'react-native';
import {IMG} from '../Config/Constants.js';
import {FILLSCREEN} from '../Config/Styles.js';

const Splash = () => <Image style={FILLSCREEN} source={{uri: IMG.SPLASH}} />;

export default Splash;
