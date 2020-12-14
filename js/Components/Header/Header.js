import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import Tab from './Tab';
import {COLORS} from '../../Constants';

const Header = (props) => {
  const search = useRef(null);
  const sermons = useRef(null);
  const watchlive = useRef(null);
  const giving = useRef(null);
  const contact = useRef(null);

  const styles = {
    header: {
      paddingBottom: 5,
      alignItems: 'center',
      width: '100%',
      height: 80,
      zIndex: 3,
      backgroundColor: COLORS.TRANSPARENT,
    },
    scrollView: {
      zIndex: 2,
      height: 80,
      width: props.isDebug ? 900 : 775,
    },
    contentContainerStyle: {
      height: 78,
      width: props.isDebug ? 900 : 775,
      justifyContent: 'center',
      zIndex: 2,
    },
    transparentBackground: {
      position: 'absolute',
      top: 12,
      height: 80,
      width: props.isDebug ? 900 : 775,
      backgroundColor: COLORS.GRAY,
      borderRadius: 50,
      opacity: 0.3,
    },
  };

  return (
    <View
      style={styles.header}
      pointerEvents={props.player.visible ? 'none' : 'auto'}>
      <View style={styles.transparentBackground} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal={true}>
        <Tab ref={search} label={'Search'} />
        <Tab ref={sermons} label={'Sermons'} />
        <Tab ref={watchlive} label={'Watch Live'} />
        <Tab ref={giving} label={'Giving'} />
        <Tab ref={contact} label={'Contact'} />
        {props.isDebug && <Tab label={'Debug'} />}
      </ScrollView>
    </View>
  );
};

const mapState = (state) => {
  return {
    player: state.player,
    isDebug: state.isDebug,
  };
};

export default connect(mapState)(Header);

Header.propTypes = {
  player: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    paused: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    nextUrl: PropTypes.string.isRequired,
  }),
  isDebug: PropTypes.bool.isRequired,
};
