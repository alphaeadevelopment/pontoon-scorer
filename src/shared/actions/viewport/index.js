import { createAction } from 'redux-actions';
import * as Types from './types';

export const resize = createAction(Types.RESIZE);
export const setSize = (width, height) => dispatch => dispatch(resize({ width, height }));
