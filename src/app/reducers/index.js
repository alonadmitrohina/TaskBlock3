import { combineReducers } from 'redux';

import user from './user';
import songs from './song'
import playlists from "./playlists";

export default combineReducers({
  user,
  songs,
  playlists,
});
