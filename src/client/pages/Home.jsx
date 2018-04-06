import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
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
});
export class RawHome extends React.Component {
  render() {
    const {
      classes, players, addPlayer, newRound, resetGame, handsInPlay, ...rest
    } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Grid container>
            <Grid item xs={9}>
              <div>
                <Button onClick={addPlayer}>Add Player</Button>
                <Button disabled={handsInPlay > 0} onClick={newRound}>New Round</Button>
              </div>
              <PlayersGrid {...rest} players={players} />
            </Grid>
            <Grid item xs={3}>
              <Leaderboard players={players} />
            </Grid>
          </Grid>
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
        </div>
      </div >
    );
  }
}
const mapStateToProps = state => ({
  players: Selectors.getPlayers(state),
  dealerIdx: Selectors.getDealerIdx(state),
  handsInPlay: Selectors.handsInPlay(state),
});

const dispatchToActions = dispatch => ({
  addPlayer: () => dispatch(Actions.addPlayer()),
  newRound: () => dispatch(Actions.newRound()),
  resetGame: () => dispatch(Actions.resetGame()),
  onChangePlayerName: playerIdx => name => dispatch(Actions.setPlayerName({ playerIdx, name })),
  onSetStake: playerIdx => handIdx => stake => dispatch(Actions.setStake({ playerIdx, handIdx, stake })),
  onBuyCard: playerIdx => handIdx => stake => dispatch(Actions.buyCard({ playerIdx, handIdx, stake })),
  onSplit: playerIdx => handIdx => () => dispatch(Actions.splitHand({ playerIdx, handIdx })),
  onBust: playerIdx => handIdx => () => dispatch(Actions.bustHand({ playerIdx, handIdx })),
  onWin: playerIdx => handIdx => () => dispatch(Actions.handWins({ playerIdx, handIdx })),
  onWinDouble: playerIdx => handIdx => () => dispatch(Actions.handWinsDouble({ playerIdx, handIdx })),
  onLose: playerIdx => handIdx => () => dispatch(Actions.handLoses({ playerIdx, handIdx })),
  onAllLose: () => dispatch(Actions.allLose({ multiple: 1 })),
  onAllLoseDouble: () => dispatch(Actions.allLose({ multiple: 2 })),
  onAllWin: () => dispatch(Actions.allWin()),
  onMakeDealer: playerIdx => () => dispatch(Actions.makeDealer({ playerIdx })),
});

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawHome));
