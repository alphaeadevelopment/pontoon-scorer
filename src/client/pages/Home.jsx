import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
import PlayersGrid from './PlayersGrid';
import * as Actions from '../actions';
import Leaderboard from './Leaderboard';

const styles = () => ({
  root: {
    'width': '100%',
    'height': '100%',
  },
});
export class RawHome extends React.Component {
  render() {
    const {
      classes, players, addPlayer, newRound, resetGame, ...rest
    } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Grid container>
            <Grid item xs={9}>
              <div>
                <Button onClick={addPlayer}>Add Player</Button>
                <Button onClick={newRound}>New Round</Button>
                <Button onClick={resetGame}>Reset Game</Button>
              </div>
              <PlayersGrid {...rest} players={players} />
            </Grid>
            <Grid item xs={3}>
              <Leaderboard players={players} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: Selectors.getPlayers(state),
  dealerIdx: Selectors.getDealerIdx(state),
});

const dispatchToActions = dispatch => ({
  addPlayer: () => dispatch(Actions.addPlayer()),
  newRound: () => dispatch(Actions.newRound()),
  resetGame: () => dispatch(Actions.resetGame()),
  onChangePlayerName: playerIdx => name => dispatch(Actions.setPlayerName({ playerIdx, name })),
  onSetStake: playerIdx => handIdx => stake => dispatch(Actions.setStake({ playerIdx, handIdx, stake })),
  onSplit: playerIdx => handIdx => () => dispatch(Actions.splitHand({ playerIdx, handIdx })),
  onBust: playerIdx => handIdx => () => dispatch(Actions.bustHand({ playerIdx, handIdx })),
  onWin: playerIdx => handIdx => () => dispatch(Actions.handWins({ playerIdx, handIdx })),
  onWinDouble: playerIdx => handIdx => () => dispatch(Actions.handWinsDouble({ playerIdx, handIdx })),
  onLose: playerIdx => handIdx => () => dispatch(Actions.handLoses({ playerIdx, handIdx })),
  onAllLose: () => dispatch(Actions.allLose()),
  onAllWin: () => dispatch(Actions.allWin()),
  onMakeDealer: playerIdx => () => dispatch(Actions.makeDealer({ playerIdx })),
});

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawHome));
