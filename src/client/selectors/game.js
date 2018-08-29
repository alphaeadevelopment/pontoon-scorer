import { createSelector } from 'reselect';

export const getGame = state => state.game;

export const getPlayers = createSelector(getGame, game => game.players);
export const getPhase = createSelector(getGame, game => game.phase);
export const getDealerIdx = state => state.game.dealer;
export const getCurrentPlayer = state => state.game.currentPlayer;
export const getCurrentPlayerHand = state => state.game.currentPlayerHand;
export const getAllHands = createSelector(
  getPlayers, players => players.reduce((arr, p) => {
    arr.push(...p.hands);
    return arr;
  }, []),
);
export const getAllPlayerHands = createSelector(
  getPlayers, getDealerIdx,
  (players, dealerIdx) => players.filter(p => p.idx !== dealerIdx).reduce((arr, p) => {
    arr.push(...p.hands);
    return arr;
  }, []),
);
export const handsInPlay = createSelector(getAllHands, h => h.length);
export const activeHandsInPlay = createSelector(getAllPlayerHands, h => h.filter(hh => hh.active).length);
