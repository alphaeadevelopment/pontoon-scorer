/* globals window */
import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import {
  getActiveHandsInPlay,
  getCurrentPlayer,
  getPlayers,
  isBetweenRounds,
  getPhase,
} from '../selectors';
import PlayersGrid from './PlayersGrid';
import {
  addPlayer,
  newRound,
  resetGame,
  startGame,
} from '../actions';
import { ConfirmButton, Button } from '../components';
import { ROUND_OVER } from '../lib/constants/game-phases';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
  },
  reset: {
    background: 'red',
    width: '75%',
    borderRadius: '2px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: theme.palette.common.white,
    fontWeight: '700',
    fontSize: '150%',
    marginTop: theme.spacing.unit * 5,
  },
  leaderboardCtr: {
    'background': 'lightgrey',
  },
});
@connect(
  state => ({
    activeHandsInPlay: getActiveHandsInPlay(state),
    betweenRounds: isBetweenRounds(state),
    currentPlayer: getCurrentPlayer(state),
    players: getPlayers(state),
    phase: getPhase(state),
  }),
  {
    onAddPlayer: addPlayer,
    onNewRound: newRound,
    onResetGame: resetGame,
    onStartGame: startGame,
  },
)
@injectSheet(styles)
export class Game extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { phase: currentPhase } = this.props;
    const { phase: nextPhase } = nextProps;
    if (nextPhase === ROUND_OVER && nextPhase !== currentPhase) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const {
      activeHandsInPlay,
      betweenRounds,
      classes,
      currentPlayer,
      onAddPlayer,
      onNewRound,
      onResetGame,
      onStartGame,
      players,
    } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Button disabled={!betweenRounds} onClick={onAddPlayer}>
            Add Player
          </Button>
          {currentPlayer === null &&
            <Button disabled={players.length < 2} onClick={onStartGame}>
              Start Game
            </Button>
          }
          {currentPlayer !== null &&
            <Button disabled={activeHandsInPlay > 0} onClick={onNewRound}>
              New Round
            </Button>
          }
        </div>
        <PlayersGrid />
        <div>
          <ConfirmButton
            className={classes.reset}
            onConfirm={onResetGame}
            title={'Reset Game'}
            message={'You will lose all game scores, are you sure?'}
          >
            Reset Game
          </ConfirmButton>
        </div>
      </div>
    );
  }
}

export default Game;
