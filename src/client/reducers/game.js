import update from 'immutability-helper';
import * as Types from '../actions/types';

const initial = {
  players: [],
  dealer: null,
};
const STARTING_POT = 15;

const newHand = stake => ({
  stake,
});

const resetHands = player => ({
  name: player.name,
  pot: player.pot,
  hands: [newHand(0)],
  idx: player.idx,
});

// const getTotalStake = players => players.reduce((tot, p) => tot + (p.))

// const allPlayersLoseUpdatePlayer = (p, totalStake) => p;

// const allPlayersLose = state => ({
//   players: state.players.map(p => allPlayersLoseUpdatePlayer(p, getTotalStake(state.players))),
// });

const newPlayer = idx => ({
  name: `Player ${idx + 1}`,
  pot: STARTING_POT,
  hands: [newHand(0)],
  idx,
});
export default (state = initial, { type, payload }) => {
  switch (type) {
    case Types.ADD_PLAYER:
      return update(state, {
        players: { $push: [newPlayer(state.players.length)] },
        dealer: { $apply: v => (v === null ? state.players.length : v) },
      });
    case Types.NEW_ROUND:
      return update(state, {
        players: { $apply: players => players.map(p => resetHands(p)) },
      });
    case Types.RESET_GAME:
      return initial;
    case Types.SET_PLAYER_NAME:
      return update(state, { players: { [payload.playerIdx]: { name: { $set: payload.name } } } });
    case Types.SET_STAKE:
      return update(state, { players: { [payload.playerIdx]: { hands: { [payload.handIdx]: { stake: { $set: payload.stake } } } } } });
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
        players: {
          [payload.playerIdx]: {
            pot: { $apply: pot => pot + Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) },
            hands: { $splice: [[payload.handIdx, 1]] },
          },
          [state.dealer]: {
            pot: { $apply: pot => pot - Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) },
          },
        },
      });
    case Types.HAND_WINS_DOUBLE:
      return update(state, {
        players: {
          [payload.playerIdx]: {
            pot: { $apply: pot => pot + (Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) * 2) },
            hands: { $splice: [[payload.handIdx, 1]] },
          },
          [state.dealer]: {
            pot: { $apply: pot => pot - (Number(state.players[payload.playerIdx].hands[payload.handIdx].stake) * 2) },
          },
        },
      });
    case Types.HAND_LOSES:
      return update(state, {
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
    // case Types.ALL_LOSE:
    //   return update(state, {
    //     players: allPlayersLose(state),
    //   });
    default:
      return state;
  }
};
