import React from 'react';
import Grid from 'material-ui/Grid';
import clone from 'lodash/clone';
import { withStyles } from 'material-ui/styles';
import Player from './Player';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
  },
});

const sortPlayers = (players, dealerIdx) => clone(players)
  .sort((a, b) => {
    if (a.idx === dealerIdx) return -1;
    if (b.idx === dealerIdx) return 1;
    return a.idx - b.idx;
  });

class RawPlayersGrid extends React.Component {
  render() {
    const {
      classes, players, dealerIdx, onChangePlayerName, onSetStake, onSplit, onBust, onMakeDealer,
      onWin, onLose, onWinDouble, onAllLose, onAllWin } = this.props;
    return (
      <Grid container className={classes.root}>
        {sortPlayers(players, dealerIdx).map(p => (
          <Player
            isDealer={dealerIdx === p.idx}
            onChangeName={onChangePlayerName(p.idx)}
            key={p.idx}
            onSetStake={onSetStake(p.idx)}
            onSplit={onSplit(p.idx)}
            onBust={onBust(p.idx)}
            onWin={onWin(p.idx)}
            onWinDouble={onWinDouble(p.idx)}
            onLose={onLose(p.idx)}
            onMakeDealer={onMakeDealer(p.idx)}
            onAllLose={onAllLose}
            onAllWin={onAllWin}
            player={p}
          />
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(RawPlayersGrid);
