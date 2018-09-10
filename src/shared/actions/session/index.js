import { createAction } from 'redux-actions';
import * as Types from './types';

const doSayHi = createAction(Types.SAY_HI);
const doSayBye = createAction(Types.SAY_BYE);

export const sayHi = () => (dispatch) => {
  dispatch(doSayHi());
};
export const sayBye = () => (dispatch) => {
  dispatch(doSayBye());
};
