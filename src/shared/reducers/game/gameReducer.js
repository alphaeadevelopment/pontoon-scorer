import update from 'immutability-helper';
import * as Types from '../../actions/types';
import { firstPlayer, getGamePhaseAfterSetStake, getPlayerAfterSetStake } from './helpers';
import { nextHand as updateNextHand, handLoses } from './updaters';
import { ADD_PLAYERS, SET_STAKE, GAME_PLAY, ROUND_OVER } from '../../lib/constants/game-phases';

const initial = {
  players: [],
  dealer: null,
  currentPlayer: null,
  currentPlayerHand: null,
  phase: ADD_PLAYERS,
};
const STARTING_POT = 15;

const newHand = stake => ({
  stake,
  active: true,
});

const resetHands = player => ({
  ...player,
  hands: [newHand(0)],
  initialStake: null,
});

const getPlayerHandsTotalStake = (player, multiple) =>
  player.hands.reduce((tot, h) => (tot + (h.stake * multiple)), 0);

const getTotalStake = (players, multiple) => players.reduce((tot, p) => {
  const playerTotal = getPlayerHandsTotalStake(p, multiple);
  return (tot + playerTotal);
}, 0);

const updateAllHandsPlayerUpdate = (p, isDealer, totalStake, dealerWins, multiple) => {
  let newPot;
  if (isDealer) {
    if (dealerWins) {
      newPot = p.pot + totalStake;
    }
    else {
      newPot = p.pot - totalStake;
    }
  }
  else {
    const playerTotal = getPlayerHandsTotalStake(p, multiple);
    if (dealerWins) {
      newPot = p.pot - playerTotal;
    }
    else {
      newPot = p.pot + playerTotal;
    }
  }
  return {
    ...p,
    hands: [],
    pot: newPot,
  };
};

const updateAllHands = (state, dealerWins, multiple) => {
  const totalStake = getTotalStake(state.players, multiple);
  return state.players.map(p => updateAllHandsPlayerUpdate(p, p.idx === state.dealer, totalStake, dealerWins, multiple));
};

const newPlayer = idx => ({
  name: `Player ${idx + 1}`,
  pot: STARTING_POT,
  hands: [],
  initialStake: null,
  idx,
});

export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.ADD_PLAYER:
      return update(state, {
        players: { $push: [newPlayer(state.players.length)] },
        dealer: { $apply: v => (v === null ? state.players.length : v) },
      });
    case Types.GAME_LOADED:
      return payload;
    case Types.NEW_ROUND:
      return update(state, {
        players: { $apply: players => players.map(p => resetHands(p)) },
        phase: { $set: SET_STAKE },
        currentPlayer: { $set: firstPlayer(state) },
        currentPlayerHand: { $set: 0 },
      });
    case Types.END_ROUND:
      return update(state, {
        phase: { $set: ROUND_OVER },
        currentPlayer: { $set: 0 },
        currentPlayerHand: { $set: 0 },
      });
    case Types.RESET_GAME:
      return initial;
    case Types.START_GAME:
      return update(state, {
        settings: { $set: payload.settings },
        currentPlayer: { $set: firstPlayer(state) },
        currentPlayerHand: { $set: 0 },
        phase: { $set: SET_STAKE },
        players: { $apply: players => players.map(p => resetHands(p)) },
      });
    case Types.STICK_HAND:
      return update(state, { ...updateNextHand(state) });
    case Types.SET_PLAYER_NAME:
      return update(state, {
        players: { [payload.playerIdx]: { name: { $set: payload.name } } },
      });
    case Types.SET_STAKE:
      return update(state, {
        players: {
          [payload.playerIdx]: {
            initialStake: { $set: Number(payload.stake) },
            hands: { [payload.handIdx]: { stake: { $set: Number(payload.stake) } } },
          },
        },
        currentPlayer: { $set: getPlayerAfterSetStake(state) },
        phase: { $apply: currentPhase => getGamePhaseAfterSetStake(currentPhase, state) },
      });
    case Types.BUY_CARD:
      return update(state, {
        players: {
          [payload.playerIdx]: {
            hands: {
              [payload.handIdx]: {
                lastBid: { $set: Number(payload.stake) },
                stake: {
                  $set: state.players[payload.playerIdx].hands[payload.handIdx].stake + Number(payload.stake),
                },
              },
            },
          },
        },
      });
    case Types.SPLIT_HAND:
      return update(state, {
        players: {
          [payload.playerIdx]: {
            hands: {
              $push: [
                newHand(state.players[payload.playerIdx].hands[payload.handIdx].stake),
              ],
            },
          },
        },
      });
    case Types.BUST_HAND:
      return update(state, {
        ...updateNextHand(state),
        players: {
          [payload.playerIdx]: {
            pot: { $apply: pot => pot - Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) },
            hands: { $splice: [[payload.handIdx, 1]] },
          },
          [state.dealer]: {
            pot: { $apply: pot => pot + Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) },
          },
        },
      });
    case Types.HAND_WINS:
      return update(state, {
        ...updateNextHand(state),
        players: {
          [payload.playerIdx]: {
            pot: { $apply: pot => pot + Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) },
            hands: { [payload.handIdx]: { active: { $set: false } } },
          },
          [state.dealer]: {
            pot: { $apply: pot => pot - Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) },
          },
        },
      });
    case Types.HAND_WINS_DOUBLE:
      return update(state, {
        ...updateNextHand(state),
        players: {
          [payload.playerIdx]: {
            pot: { $apply: pot => pot + (Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) * 2) },
            hands: { [payload.handIdx]: { active: { $set: false } } },
          },
          [state.dealer]: {
            pot: { $apply: pot => pot - (Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) * 2) },
          },
        },
      });
    case Types.HAND_LOSES:
      return update(state, handLoses(state, payload));
    case Types.MAKE_DEALER:
      return update(state, {
        dealer: { $set: payload.playerIdx },
        players: {
          [state.dealer]: {
            hands: {
              $set: [newHand(0)],
            },
          },
          [payload.playerIdx]: {
            hands: { $set: [] },
          },
        },
      });
    case Types.ALL_LOSE:
      return update(state, {
        players: { $set: updateAllHands(state, true, payload.multiple) },
        phase: { $set: ROUND_OVER },
      });
    case Types.ALL_WIN:
      return update(state, {
        players: { $set: updateAllHands(state, false, 1) },
        phase: { $set: ROUND_OVER },
      });
    case Types.START_GAME_PROPER:
      return update(state, {
        phase: { $set: GAME_PLAY },
        currentPlayer: { $set: firstPlayer(state) },
        currentPlayerHand: { $set: 0 },
      });
    default:
      return state;
  }
};
