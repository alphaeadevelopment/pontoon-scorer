import { getActiveHandsInPlay } from '../selectors';
import { endRound } from '../actions';

let numActive;

export default ({ getState, dispatch }) => () => {
  const state = getState();
  const nextNumActive = getActiveHandsInPlay(state);
  if (numActive > 0 && nextNumActive === 0) {
    numActive = nextNumActive;
    dispatch(endRound());
  }
  numActive = nextNumActive;
};
