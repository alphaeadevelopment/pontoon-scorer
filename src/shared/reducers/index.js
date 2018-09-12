import { combineReducers } from 'redux';
import game from './game';
import viewport from './viewport';
import page from '../pages/reducers';

export default combineReducers({
  page,
  game,
  viewport,
});
