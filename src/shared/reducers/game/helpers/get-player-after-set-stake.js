import lastPlayer from './last-player';
import nextPlayer from './next-player';

export default ({ dealer, players, currentPlayer }) => {
  if (currentPlayer === lastPlayer({ dealer, players })) return dealer;
  return nextPlayer({ dealer, players, currentPlayer });
};
