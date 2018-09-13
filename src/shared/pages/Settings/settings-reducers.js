import update from 'immutability-helper';
import * as Types from './settings-action-types';

const initial = {
  open: false,
  game: {
    stake: {
      minimum: 1,
      maximum: 5,
    },
  },
};

export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.OPEN_SETTINGS:
      return update(state, {
        open: { $set: true },
      });
    case Types.CLOSE_SETTINGS:
      return update(state, {
        open: { $set: false },
      });
    case Types.SET_MINIMUM_STAKE:
      return update(state, {
        game: { stake: { minimum: { $set: payload } } },
      });
    case Types.SET_MAXIMUM_STAKE:
      return update(state, {
        game: { stake: { maximum: { $set: payload } } },
      });
    default:
      return state;
  }
};
