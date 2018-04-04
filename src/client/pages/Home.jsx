import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import * as Selectors from '../selectors';
import Player from './Player';
import * as Actions from '../actions';
import Leaderboard from './Leaderboard';

const styles = theme => ({
  root: {
    // 'position': 'relative',
    'width': '100%',
    'height': '100%',
    // '&>div': {
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translateX(-50%) translateY(-50%)',
    // },
  },
  playersCtr: {
    width: '100%',
    padding: theme.spacing.unit * 2,
  },
});
export class RawHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      classes, players, dealerIdx, addPlayer, onChangePlayerName, onSetStake, onSplit, onBust, onMakeDealer,
      onWin, onLose, onWinDouble, newRound, resetGame, onAllLose,
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
              <Grid container className={classes.playersCtr}>
                {players.map((p, playerIdx) => (
                  <Player
                    isDealer={dealerIdx === playerIdx}
                    onChangeName={onChangePlayerName(playerIdx)}
                    key={playerIdx}
                    onSetStake={onSetStake(playerIdx)}
                    onSplit={onSplit(playerIdx)}
                    onBust={onBust(playerIdx)}
                    onWin={onWin(playerIdx)}
                    onWinDouble={onWinDouble(playerIdx)}
                    onLose={onLose(playerIdx)}
                    onMakeDealer={onMakeDealer(playerIdx)}
                    onAllLose={onAllLose}
                    player={p}
                  />
                ))}
              </Grid>
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
  onMakeDealer: playerIdx => () => dispatch(Actions.makeDealer({ playerIdx })),
});

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawHome));
