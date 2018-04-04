import { createAction } from 'redux-actions';
import * as Types from './types';

export const addPlayer = createAction(Types.ADD_PLAYER);
export const newRound = createAction(Types.NEW_ROUND);
export const resetGame = createAction(Types.RESET_GAME);
export const setPlayerName = createAction(Types.SET_PLAYER_NAME);
export const setStake = createAction(Types.SET_STAKE);
export const splitHand = createAction(Types.SPLIT_HAND);
export const bustHand = createAction(Types.BUST_HAND);
export const handWins = createAction(Types.HAND_WINS);
export const handWinsDouble = createAction(Types.HAND_WINS_DOUBLE);
export const handLoses = createAction(Types.HAND_LOSES);
export const makeDealer = createAction(Types.MAKE_DEALER);
export const allLose = createAction(Types.ALL_LOSE);
