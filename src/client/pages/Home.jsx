import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import {
  getPlayers,
  getDealerIdx,
  activeHandsInPlay as getActiveHandsInPlay,
  getCurrentPlayer,
  getCurrentPlayerHand,
  getPhase,
} from '../selectors';
import PlayersGrid from './PlayersGrid';
import * as Actions from '../actions';
import Leaderboard from './Leaderboard';
import { ConfirmButton } from '../components';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
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
export class RawHome extends React.Component {
  render() {
    const {
      classes, players, addPlayer, newRound, startGame, resetGame, ...rest
    } = this.props;
    const { currentPlayer, dealerIdx, activeHandsInPlay } = rest;
    return (
      <div className={classes.root}>
        <div>
          <Grid container>
            <Grid item xs={12} sm={10} md={9}>
              <div>
                <Button onClick={addPlayer}>Add Player</Button>
                {currentPlayer === null && <Button disabled={players.length < 2} onClick={startGame}>Start Game</Button>}
                {currentPlayer !== null && <Button disabled={activeHandsInPlay > 0} onClick={newRound}>New Round</Button>}
              </div>
              <PlayersGrid {...rest} players={players} />
              <div>
                <ConfirmButton
                  className={classes.reset}
                  onConfirm={resetGame}
                  title={'Reset Game'}
                  message={'You will lose all game scores, are you sure?'}
                >
                  Reset Game
                </ConfirmButton>
              </div>
            </Grid>
            <Grid className={classes.leaderboardCtr} item xs={12} sm={2} md={3}>
              <Leaderboard players={players} dealer={dealerIdx} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: getPlayers(state),
  dealerIdx: getDealerIdx(state),
  activeHandsInPlay: getActiveHandsInPlay(state),
  currentPlayer: getCurrentPlayer(state),
  currentPlayerHand: getCurrentPlayerHand(state),
  gamePhase: getPhase(state),
});

const dispatchToActions = dispatch => ({
  addPlayer: () => dispatch(Actions.addPlayer()),
  newRound: () => dispatch(Actions.newRound()),
  resetGame: () => dispatch(Actions.resetGame()),
  startGame: () => dispatch(Actions.startGame()),
  onChangePlayerName: playerIdx => name => dispatch(Actions.setPlayerName({ playerIdx, name })),
  onSetStake: playerIdx => handIdx => stake => dispatch(Actions.setStake({ playerIdx, handIdx, stake })),
  onBuyCard: playerIdx => handIdx => stake => dispatch(Actions.buyCard({ playerIdx, handIdx, stake })),
  onSplit: playerIdx => handIdx => () => dispatch(Actions.splitHand({ playerIdx, handIdx })),
  onStick: playerIdx => handIdx => () => dispatch(Actions.stick({ playerIdx, handIdx })),
  onBust: playerIdx => handIdx => () => dispatch(Actions.bustHand({ playerIdx, handIdx })),
  onWin: playerIdx => handIdx => () => dispatch(Actions.handWins({ playerIdx, handIdx })),
  onWinDouble: playerIdx => handIdx => () => dispatch(Actions.handWinsDouble({ playerIdx, handIdx })),
  onLose: playerIdx => handIdx => () => dispatch(Actions.handLoses({ playerIdx, handIdx })),
  onAllLose: () => dispatch(Actions.allLose({ multiple: 1 })),
  onAllLoseDouble: () => dispatch(Actions.allLose({ multiple: 2 })),
  onAllWin: () => dispatch(Actions.allWin()),
  onMakeDealer: playerIdx => () => dispatch(Actions.makeDealer({ playerIdx })),
  onStartGameProper: () => dispatch(Actions.startGameProper()),
});

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawHome));
