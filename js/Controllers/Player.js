import {TVMenuControl} from 'react-native';

const enable = (that) => {
  TVMenuControl.enableTVMenuKey();
  const nextUrl = that.state.player.nextUrl;
  that.setState({
    player: {
      nextUrl: nextUrl,
      url: nextUrl,
      enabled: true,
      visible: true,
      paused: false,
    },
  });
};

const error = (that) => {
  TVMenuControl.disableTVMenuKey();
  that.setState((prevState) => ({
    player: {
      ...prevState.player,
      visible: false,
      enabled: false,
    },
  }));
};

const init = (that) => {
  if (that.state.player.enabled) {
    that.setState(
      (prevState) => ({
        player: {
          ...prevState.player,
          enabled: false,
        },
      }),
      () => enable(that),
    );
  } else {
    enable(that);
  }
};

const minimize = (that) => {
  TVMenuControl.disableTVMenuKey();
  that.setState((prevState) => ({
    player: {
      ...prevState.player,
      paused: true,
      visible: false,
    },
  }));
};

const resume = (that) => {
  TVMenuControl.enableTVMenuKey();
  that.setState((prevState) => ({
    player: {
      ...prevState.player,
      enabled: true,
      visible: true,
      paused: false,
    },
  }));
};

export {enable, error, init, minimize, resume};
