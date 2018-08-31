import { createAction } from 'redux-actions';
import * as Types from './types';

export const showModal = createAction(Types.SHOW_MODAL);
export const hideModal = createAction(Types.HIDE_MODAL);
