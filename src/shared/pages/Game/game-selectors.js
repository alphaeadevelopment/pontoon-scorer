import { createSelector } from 'reselect';

import { ROUND_OVER, DEALER_HAND, ADD_PLAYERS } from '../../lib/constants/game-phases';

export const getGame = state => state.page.game.present;
export const getUndoHistory = state => state.page.game.past || [];
export const getRedoHistory = state => state.page.game.future || [];

export const canUndo = createSelector(getUndoHistory, history => history.length > 0);
export const canRedo = createSelector(getRedoHistory, history => history.length > 0);
export const getPlayers = createSelector(getGame, game => game.players);
export const getPhase = createSelector(getGame, game => game.phase);

export const getDealerIdx = createSelector(getGame, game => game.dealer);
export const getCurrentPlayer = createSelector(getGame, game => game.currentPlayer);
export const getCurrentPlayerHand = createSelector(getGame, game => game.currentPlayerHand);
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
  [getPhase],
  phase => phase === ROUND_OVER || phase === ADD_PLAYERS);
export const isDealerHand = createSelector(
  [getActiveHandsInPlay, getPhase],
  (activeHandsInPlay, phase) => phase === DEALER_HAND && activeHandsInPlay > 0);

export const getGameSettings = createSelector(getGame, game => game.settings);
