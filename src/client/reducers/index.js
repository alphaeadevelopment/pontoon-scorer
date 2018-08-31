import { combineReducers } from 'redux';
import drawer from './drawer';
import errors from './errors';
import game from './game';
import modal from './modal';
import viewport from './viewport';

export default combineReducers({
  drawer,
  errors,
  game,
  modal,
  viewport,
});
