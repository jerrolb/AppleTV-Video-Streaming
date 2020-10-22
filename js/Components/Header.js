import React from 'react';
import {Image, Text, TouchableHighlight, View, ScrollView} from 'react-native';
import {IMG} from '../Constants';
import Tab from './Tab';

class Header extends React.Component {
  render() {
    return (
      <View
        style={styles.header}
        pointerEvents={() => {
          this.props.doDisableTouchableHighlight ? 'none' : 'auto';
        }}>
        <Image style={styles.logo} source={{uri: IMG.LOGO}} />
        <ScrollView
          contentContainerStyle={{
            opacity: 0.75,
            height: 88,
            width: 650,
            justifyContent: 'center',
            backgroundColor: '#808080',
          }}
          style={{
            borderRadius: 50,
            height: 80,
            width: 650,
          }}
          horizontal={true}>
          {/* <Tab
          ref={(e) => (this.search = e)}
          label={'Search'}
          setIsHeaderFocused={this.props.setIsHeaderFocused}
          setScreen={this.props.setScreen}
          screen={this.props.screen}
        /> */}
          <Tab
            ref={(e) => (this.sermons = e)}
            label={'Sermons'}
            setIsHeaderFocused={this.props.setIsHeaderFocused}
            setScreen={this.props.setScreen}
            screen={this.props.screen}
            isAppLoaded={this.props.isAppLoaded}
          />
          {/* <Tab
          ref={(e) => (this.watchlive = e)}
          label={'Watch Live'}
          setIsHeaderFocused={this.props.setIsHeaderFocused}
          setScreen={this.props.setScreen}
          screen={this.props.screen}
        /> */}
          <Tab
            ref={(e) => (this.giving = e)}
            label={'Giving'}
            setIsHeaderFocused={this.props.setIsHeaderFocused}
            setScreen={this.props.setScreen}
            screen={this.props.screen}
          />
          <Tab
            ref={(e) => (this.contact = e)}
            label={'Contact'}
            setIsHeaderFocused={this.props.setIsHeaderFocused}
            setScreen={this.props.setScreen}
            screen={this.props.screen}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  header: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 80,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 80,
    width: 400,
    height: 80,
    resizeMode: 'contain',
  },
};

export default Header;
