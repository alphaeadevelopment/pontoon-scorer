import update from 'immutability-helper';
import * as Types from '../actions/modal/types';

const initial = { show: false };

export default (state = initial, { type }) => {
  switch (type) {
    case Types.SHOW_MODAL:
      return update(state, {
        show: { $set: true },
      });
    case Types.HIDE_MODAL:
      return update(state, {
        show: { $set: false },
      });
    default:
      return state;
  }
};
