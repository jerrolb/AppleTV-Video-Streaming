import React from 'react';
import {View, ScrollView} from 'react-native';
import Tab from './Tab';

class Header extends React.Component {
  render() {
    return (
      <View
        style={styles.header}
        pointerEvents={() => {
          this.props.doDisableTouchableHighlight ? 'none' : 'auto';
        }}>
        <View style={styles.transparentBackground} />
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollViewContainer}
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
  scrollViewContainer: {
    zIndex: 3,
    height: 80,
    width: 650,
  },
  scrollViewContent: {
    height: 78,
    width: 650,
    justifyContent: 'center',
    zIndex: 3,
  },
  transparentBackground: {
    position: 'absolute',
    top: 10,
    height: 80,
    width: 650,
    backgroundColor: '#808080',
    borderRadius: 50,
    opacity: 0.3,
  },
};

export default Header;
