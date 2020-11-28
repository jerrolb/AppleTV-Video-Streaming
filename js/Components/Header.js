import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import Tab from './Tab';

class Header extends React.Component {
  render() {
    return (
      <View
        style={styles.header}
        pointerEvents={() => {
          this.props.player.visible ? 'none' : 'auto';
        }}>
        <View style={styles.transparentBackground} />
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollViewContainer}
          horizontal={true}>
          <Tab ref={(e) => (this.search = e)} label={'Search'} />
          <Tab ref={(e) => (this.sermons = e)} label={'Sermons'} />
          <Tab ref={(e) => (this.watchlive = e)} label={'Watch Live'} />
          <Tab ref={(e) => (this.giving = e)} label={'Giving'} />
          <Tab ref={(e) => (this.contact = e)} label={'Contact'} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  header: {
    paddingBottom: 5,
    alignItems: 'center',
    width: '100%',
    height: 80,
    zIndex: 3,
    backgroundColor: 'transparent',
  },
  scrollViewContainer: {
    zIndex: 2,
    height: 80,
    width: 775,
  },
  scrollViewContent: {
    height: 78,
    width: 775,
    justifyContent: 'center',
    zIndex: 2,
  },
  transparentBackground: {
    position: 'absolute',
    top: 12,
    height: 80,
    width: 775,
    backgroundColor: '#808080',
    borderRadius: 50,
    opacity: 0.3,
  },
};

const mapState = (state) => {
  return {
    player: state.player,
  };
};

export default connect(mapState, null, null, {forwardRef: true})(Header);
