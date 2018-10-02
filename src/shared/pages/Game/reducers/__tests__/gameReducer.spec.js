import { gameReducer } from '../gameReducer';
import { RESET_GAME, HAND_LOSES } from '../../action-types';

const resultsState = {
  players: [
    {
      name: 'Player 1',
      pot: 15,
      hands: [
        {
          stake: 0,
          active: true,
        },
      ],
      initialStake: null,
      idx: 0,
    },
    {
      name: 'Player 2',
      pot: 15,
      hands: [
        {
          stake: 1,
          active: true,
        },
      ],
      initialStake: 1,
      idx: 1,
    },
    {
      name: 'Player 3',
      pot: 15,
      hands: [
        {
          stake: 1,
          active: true,
        },
      ],
      initialStake: 1,
      idx: 2,
    },
  ],
  dealer: 0,
  currentPlayer: 1,
  currentPlayerHand: 0,
  phase: 5,
};
describe('gameReducer', () => {
  describe('initial', () => {
    it('returns initialState', () => {
      expect(gameReducer(undefined, {})).toMatchSnapshot();
    });
  });
  describe(RESET_GAME, () => {
    it('resets current phase', () => {
      const state = {
        currentPlayer: 1,
        currentPlayerHand: 1,
        dealer: 2,
        phase: 2,
        players: [{
        }],
      };
      const action = {
        type: RESET_GAME,
      };
      expect(gameReducer(state, action)).toMatchSnapshot();
    });
  });
  describe(HAND_LOSES, () => {
    it('updates scores, sets hand inactive, moves to next player', () => {
      const action = {
        type: HAND_LOSES,
        payload: {
          playerIdx: 1,
          handIdx: 0,
        },
      };
      const expectedState = {
        players: [
          {
            name: 'Player 1',
            pot: 16,
            hands: [
              {
                stake: 0,
                active: true,
              },
            ],
            initialStake: null,
            idx: 0,
          },
          {
            name: 'Player 2',
            pot: 14,
            hands: [
              {
                stake: 1,
                active: false,
              },
            ],
            initialStake: 1,
            idx: 1,
          },
          {
            name: 'Player 3',
            pot: 15,
            hands: [
              {
                stake: 1,
                active: true,
              },
            ],
            initialStake: 1,
            idx: 2,
          },
        ],
        dealer: 0,
        currentPlayer: 2,
        currentPlayerHand: 0,
        phase: 5,
      };
      expect(gameReducer(resultsState, action)).toEqual(expectedState);
    });
    it('multiple=2; updates scores, sets hand inactive, moves to next player', () => {
      const action = {
        type: HAND_LOSES,
        payload: {
          playerIdx: 1,
          handIdx: 0,
          multiple: 2,
        },
      };
      const expectedState = {
        players: [
          {
            name: 'Player 1',
            pot: 17,
            hands: [
              {
                stake: 0,
                active: true,
              },
            ],
            initialStake: null,
            idx: 0,
          },
          {
            name: 'Player 2',
            pot: 13,
            hands: [
              {
                stake: 1,
                active: false,
              },
            ],
            initialStake: 1,
            idx: 1,
          },
          {
            name: 'Player 3',
            pot: 15,
            hands: [
              {
                stake: 1,
                active: true,
              },
            ],
            initialStake: 1,
            idx: 2,
          },
        ],
        dealer: 0,
        currentPlayer: 2,
        currentPlayerHand: 0,
        phase: 5,
      };
      expect(gameReducer(resultsState, action)).toEqual(expectedState);
    });
  });
});
