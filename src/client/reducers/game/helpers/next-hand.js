export default ({ players, currentPlayer, currentPlayerHand }) => {
  if (players[currentPlayer].hands.length > (currentPlayerHand + 1)) {
    return currentPlayerHand + 1;
  }
  return 0;
};
