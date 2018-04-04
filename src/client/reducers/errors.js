import update from 'immutability-helper';
import generate from 'shortid';
import omit from 'lodash/omit';
import * as Types from '../actions/types';

const createError = (payload) => {
  const id = generate();
  return ({
    [id]: { id, message: payload.message, timestamp: new Date().getTime() },
  });
};
const initial = { meta: { init: false }, errors: {} };
export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.APPLICATION_ERROR:
      return update(state, {
        errors: {
          $merge: createError(payload),
        },
      });
    case Types.DISMISS_ERROR:
      return update(state, {
        errors: { $apply: errors => omit(errors, payload.errorId) },
      });
    default:
      return state;
  }
};
