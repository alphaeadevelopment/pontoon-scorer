import { combineReducers } from 'redux';
import game from './game';
import viewport from './viewport';

export default combineReducers({
  game,
  viewport,
});
