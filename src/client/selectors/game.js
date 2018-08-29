import { createSelector } from 'reselect';

import { ROUND_OVER, DEALER_HAND } from '../lib/constants/game-phases';

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
export const getHandsInPlay = createSelector(getAllHands, h => h.length);
export const getActiveHandsInPlay = createSelector(getAllPlayerHands, h => h.filter(hh => hh.active).length);
export const isBetweenRounds = createSelector(
  [getActiveHandsInPlay, getPhase],
  (activeHandsInPlay, phase) => phase === ROUND_OVER || activeHandsInPlay === 0);
export const isDealerHand = createSelector(
  [getActiveHandsInPlay, getPhase],
  (activeHandsInPlay, phase) => phase === DEALER_HAND && activeHandsInPlay > 0);
