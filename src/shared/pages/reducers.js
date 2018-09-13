import { combineReducers } from 'redux';
import settings from './Settings/settings-reducers';
import game from './Game/reducers';

export default combineReducers({
  settings,
  game,
});
