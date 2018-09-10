import firstPlayer from './first-player';
import { DEALER_HAND } from '../../../lib/constants/game-phases';

export default ({ phase, players, dealer, currentPlayer, currentPlayerHand }) => {
  if (players[currentPlayer].hands.length > (currentPlayerHand + 1)) {
    return currentPlayer;
  }
  if (currentPlayer + 1 >= players.length) {
    if (phase + 1 === DEALER_HAND) return dealer;
    return firstPlayer({ players, dealer });
  }
  return currentPlayer + 1;
};
