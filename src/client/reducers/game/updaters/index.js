import { nextPlayer, nextHand as getNextHand, nextPhase as getNextPhase } from '../helpers';

export const nextHand = state => ({
  currentPlayer: { $set: nextPlayer(state) },
  currentPlayerHand: { $set: getNextHand(state) },
  phase: { $set: getNextPhase(state) },
});

export const handLoses = (state, payload) => {
  const { multiple = 1 } = payload;
  return {
    ...nextHand(state),
    players: {
      [payload.playerIdx]: {
        pot: { $apply: pot => pot - (Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) * multiple) },
        hands: { [payload.handIdx]: { active: { $set: false } } },
      },
      [state.dealer]: {
        pot: { $apply: pot => pot + (Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) * multiple) },
      },
    },
  };
};
