import { getActiveHandsInPlay, getPhase } from '../selectors';
import { endRound } from '../actions';
import { ADD_PLAYERS } from '../lib/constants/game-phases';

let numActive;

export default ({ getState, dispatch }) => () => {
  const state = getState();
  const nextNumActive = getActiveHandsInPlay(state);
  const phase = getPhase(state);
  if (numActive > 0 && nextNumActive === 0 && phase !== ADD_PLAYERS) {
    numActive = nextNumActive;
    dispatch(endRound());
  }
  numActive = nextNumActive;
};
