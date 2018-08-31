import { combineReducers } from 'redux';
import game from './game';
import viewport from './viewport';
import errors from './errors';

export default combineReducers({
  game,
  errors,
  viewport,
});
