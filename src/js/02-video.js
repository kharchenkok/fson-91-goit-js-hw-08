import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { saveToLS, loadFromLS } from './storageHelpers.js';

const playerOptions = {
  quality: '1080p',
  responsive: true,
};
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe, playerOptions);
const LS_VIDEO_CURRENT_TIME_KEY = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    saveToLS(LS_VIDEO_CURRENT_TIME_KEY, seconds);
  }, 1000)
);

player.setCurrentTime(loadFromLS(LS_VIDEO_CURRENT_TIME_KEY));
