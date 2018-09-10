import update from 'immutability-helper';
import * as Types from '../actions/viewport/types';
import { window } from '../services';

const initial = { width: window.innerWidth, height: window.innerHeight };
export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.RESIZE:
      return update(state, {
        width: { $set: payload.width },
        height: { $set: payload.height },
      });
    default:
      return state;
  }
};
