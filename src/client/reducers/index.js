import { combineReducers } from 'redux';
import drawer from './drawer';
import game from './game';
import modal from './modal';
import viewport from './viewport';

export default combineReducers({
  drawer,
  game,
  modal,
  viewport,
});
