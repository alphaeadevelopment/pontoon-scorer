import { combineReducers } from 'redux';
import settings from './Settings/reducers';
import game from './Game/reducers';

export default combineReducers({
  settings,
  game,
});
