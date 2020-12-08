import {SCREEN, URL} from '../Constants';
import store from '../redux/store/index';
import AbortController from 'abort-controller';
import {FETCH_TIMEOUT} from '../Constants';
import {
  setPlaylists,
  setInfo,
  setNextUrl,
  setIsFeedReady,
  setScreen,
} from '../redux/actions/actions';

const initFeed = (feed) => {
  const httpsToHttp = (url) => url.replace('https://', 'http://');
  const videoLength = feed.shortFormVideos.length;
  const playlists = [];
  let itemIds = [];
  let playlist;
  let video;

  feed.categories.forEach((category, index) => {
    playlist = playlists[index] = {};
    playlist.title = category.name;
    playlist.videos = [];

    feed.playlists.some((feedPlaylist) => {
      if (feedPlaylist.name === category.playlistName) {
        itemIds = feedPlaylist.itemIds;
      }
    });

    itemIds.forEach((id) => {
      for (let i = 0; i < videoLength; ++i) {
        video = feed.shortFormVideos[i];
        if (id === video.id) {
          playlist.videos.push({
            playlistTitle: category.name,
            title: video.title,
            description: video.shortDescription,
            thumbnail: `thumbnails/${video.id}thumbnail.jpg`,
            background: `backgrounds/${video.id}background.jpg`,
            url: httpsToHttp(video.content.videos[0].url),
          });
          break;
        }
      }
    });
  });

  if (hasHttpsCalls(playlists)) {
    store.dispatch(setScreen(SCREEN.ERROR));
    console.error('[App.js][initFeed] There are HTTPS calls in the feed!');
  } else {
    const currVideo = playlists[0].videos[0];
    store.dispatch(setPlaylists(playlists));
    store.dispatch(
        setInfo({
          title: currVideo.title,
          description: currVideo.description,
          background: currVideo.background,
        }),
    );
    store.dispatch(setNextUrl(currVideo.url));
    store.dispatch(setIsFeedReady(true));
    store.dispatch(setScreen(SCREEN.SERMONS));
  }
};

const hasHttpsCalls = (playlists) => {
  return JSON.stringify(playlists).includes('https://');
};

const get = () => {
  const controller = new AbortController();
  const abort = () => {
    controller.abort();
  };
  const options = {
    cache: 'no-cache',
    signal: controller.signal,
  };

  setTimeout(abort, FETCH_TIMEOUT);

  fetch(URL.FEED, options)
      .then((res) => res.json())
      .then((feed) => initFeed(feed))
      .catch(() => store.dispatch(setScreen(SCREEN.ERROR)));
};

export {get};
