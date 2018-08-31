import { createAction } from 'redux-actions';
import * as Types from './types';

export const openDrawer = createAction(Types.OPEN_DRAWER);
export const closeDrawer = createAction(Types.CLOSE_DRAWER);
