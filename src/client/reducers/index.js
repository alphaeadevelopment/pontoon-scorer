import { combineReducers } from 'redux';
import errors from './errors';
import game from './game';
import modal from './modal';
import viewport from './viewport';

export default combineReducers({
  errors,
  game,
  modal,
  viewport,
});
