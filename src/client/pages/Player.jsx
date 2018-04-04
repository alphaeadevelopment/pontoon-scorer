import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hand from './Hand';

const styles = theme => ({
  root: {
    'padding': theme.spacing.unit * 2,
    '&>div': {
      'padding': theme.spacing.unit * 4,
    },
  },
  playerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit,
  },
});

class RawPlayer extends React.Component {
  render() {
    const { classes, player, isDealer, onChangeName, onSetStake, onSplit, onBust, onMakeDealer,
      onWin, onLose, onWinDouble, onAllLose, onAllWin } = this.props;
    return (
      <Grid item xs={4} className={classes.root}>
        <Paper>
          {isDealer && <Typography variant={'display1'}>Dealer</Typography>}
          <div className={classes.playerHeader}>
            <TextField value={player.name} onChange={e => onChangeName(e.target.value)} />
            <Typography>{player.pot}</Typography>
          </div>
          {!isDealer && player.hands.map((h, handIdx) => (
            <Hand
              isDealer={isDealer}
              key={handIdx}
              hand={h}
              onSetStake={onSetStake(handIdx)}
              onSplit={onSplit(handIdx)}
              onBust={onBust(handIdx)}
              onWin={onWin(handIdx)}
              onWinDouble={onWinDouble(handIdx)}
              onLose={onLose(handIdx)}
            />
          ))}
          {!isDealer && <Button onClick={onMakeDealer}>Make Dealer</Button>}
          {isDealer && <Button onClick={onAllLose}>Pontoon / All Lose</Button>}
          {isDealer && <Button onClick={onAllWin}>Bust / All Win</Button>}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(RawPlayer);
