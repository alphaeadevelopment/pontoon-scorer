import { createSelector } from 'reselect';

export const getPlayers = state => state.game.players;
export const getDealerIdx = state => state.game.dealer;
export const getAllHands = createSelector(
  getPlayers, players => players.reduce((arr, p) => {
    arr.push(...p.hands);
    return arr;
  }, []),
);
export const handsInPlay = createSelector(getAllHands, h => h.length);
