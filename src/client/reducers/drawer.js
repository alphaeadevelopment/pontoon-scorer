import update from 'immutability-helper';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/drawer/types';

const initial = { open: false };

export default (state = initial, { type }) => {
  switch (type) {
    case OPEN_DRAWER:
      return update(state, {
        open: { $set: true },
      });
    case CLOSE_DRAWER:
      return update(state, {
        open: { $set: false },
      });
    default:
      return state;
  }
};
