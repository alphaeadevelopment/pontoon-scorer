import { nextPlayer, nextHand as getNextHand, nextPhase as getNextPhase } from '../helpers';

export const nextHand = state => ({
  currentPlayer: { $set: nextPlayer(state) },
  currentPlayerHand: { $set: getNextHand(state) },
  phase: { $set: getNextPhase(state) },
});
