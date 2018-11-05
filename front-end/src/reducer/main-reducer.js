import { combineReducers } from 'redux';
import token from './token-reducer';
import dungeon from './dungeon-reducer';

export default combineReducers({
  token,
  dungeon,
});
