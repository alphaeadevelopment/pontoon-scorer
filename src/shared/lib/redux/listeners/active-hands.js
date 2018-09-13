import { getActiveHandsInPlay, getPhase } from '../../../pages/Game/game-selectors';
import { endRound } from '../../../pages/Game/game-actions';
import { ADD_PLAYERS } from '../../constants/game-phases';

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
