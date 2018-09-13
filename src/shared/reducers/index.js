import { combineReducers } from 'redux';
import viewport from './viewport';
import page from '../pages/reducers';

export default combineReducers({
  page,
  viewport,
});
