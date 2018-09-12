import { createAction } from 'redux-actions';
import * as Types from './action-types';

export const openSettings = createAction(Types.OPEN_SETTINGS);
export const closeSettings = createAction(Types.CLOSE_SETTINGS);
export const setMinStake = createAction(Types.SET_MINIMUM_STAKE);
export const setMaxStake = createAction(Types.SET_MAXIMUM_STAKE);
