import { combineReducers } from 'redux';
import categories from './categroy-reducer';
import cards from './card-reducer';

export default combineReducers({
  categories,
  cards,
});
