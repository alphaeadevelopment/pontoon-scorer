import update from 'immutability-helper';
import * as Types from '../actions/viewport/types';
import { window } from '../services';

const initial = { width: window.innerWidth, height: window.innerHeight, scrollTo: { x: null, y: null } };

const isNil = x => x === null || x === undefined;

export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.RESIZE:
      return update(state, {
        width: { $set: payload.width },
        height: { $set: payload.height },
      });
    case Types.REQUEST_SCROLL_POSITION:
      return update(state, {
        scrollTo: {
          x: { $apply: prev => (isNil(payload.x) ? prev : payload.x) },
          y: { $apply: prev => (isNil(payload.y) ? prev : payload.y) },
        },
      });
    default:
      return state;
  }
};
