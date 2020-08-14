import React from 'react';
import { Text, View } from 'react-native';
import { ERR } from '../Constants.js';
import { BODY, ERRORTEXT } from '../Styles.js'
import { Header } from '../Components';

export default class Error extends React.Component {
    render() {
        return (
            <View style={BODY}>
                <Header/>
                <Text style={ERRORTEXT}>
                    <Text>{ `${ERR.FETCH_FAILURE} \n\n` }</Text>
                    <Text>{ this.props.err && `Error: ${this.props.err} \n\n` }</Text>
                    <Text>Please click your touchpad or press </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>SELECT </Text>
                    <Text>to try again.</Text>
                </Text>
            </View>
        );
    }
}
