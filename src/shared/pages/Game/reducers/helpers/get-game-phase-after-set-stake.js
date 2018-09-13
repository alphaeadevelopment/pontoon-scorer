import lastPlayer from './last-player';

export default (currentPhase, { dealer, players, currentPlayer }) => {
  if (currentPlayer === lastPlayer({ dealer, players })) return currentPhase + 1;
  return currentPhase;
};
