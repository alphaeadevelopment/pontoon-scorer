import update from 'immutability-helper';
import * as Types from '../actions/viewport/types';

const initial = { width: 0, height: 0 };
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
