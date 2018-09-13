import { DEALER_HAND, RESULTS } from '../../../../lib/constants/game-phases';

export default ({ phase, players, currentPlayer, currentPlayerHand }) => {
  if (phase === DEALER_HAND) return RESULTS;
  if (players[currentPlayer].hands.length > (currentPlayerHand + 1)) {
    return phase;
  }
  if (currentPlayer + 1 >= players.length) {
    return phase + 1;
  }
  return phase;
};
