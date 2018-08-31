import { createAction } from 'redux-actions';
import * as Types from './types';

export const showModal = createAction(Types.SHOW);
export const hideModal = createAction(Types.HIDE);
