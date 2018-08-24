import React from 'react';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hand from './Hand';
import { InlineEditTextField } from '../components';

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
  negative: {
    background: '#f98f8f',
  },
});

class RawPlayer extends React.Component {
  render() {
    const { classes, player, isDealer, onChangeName, onSetStake, onBuyCard, onSplit, onBust, onMakeDealer,
      onWin, onLose, onAllLoseDouble, onWinDouble, onAllLose, onAllWin } = this.props;
    return (
      <Grid
        item
        xs={isDealer ? 12 : 12}
        sm={isDealer ? 12 : 6}
        md={isDealer ? 12 : 4}
        lg={isDealer ? 12 : 3}
        className={classes.root}
      >
        <Paper
          className={classNames({ [classes.negative]: player.pot < 0 })}
        >
          {isDealer && <Typography variant={'display1'}>Dealer</Typography>}
          <div className={classes.playerHeader}>
            <InlineEditTextField value={player.name} onChange={onChangeName} />
            <Typography >{player.pot}</Typography>
          </div>
          {!isDealer && player.hands.map((h, handIdx) => (
            <Hand
              isDealer={isDealer}
              key={handIdx}
              hand={h}
              initialStake={player.initialStake}
              onBuyCard={onBuyCard(handIdx)}
              onSetStake={onSetStake(handIdx)}
              onSplit={onSplit(handIdx)}
              onBust={onBust(handIdx)}
              onWin={onWin(handIdx)}
              onWinDouble={onWinDouble(handIdx)}
              onLose={onLose(handIdx)}
            />
          ))}
          {!isDealer && <Button onClick={onMakeDealer}>Make Dealer</Button>}
          {isDealer && <Button onClick={onAllLoseDouble}>Pontoon / All Lose Double</Button>}
          {isDealer && <Button onClick={onAllLose}>All Lose</Button>}
          {isDealer && <Button onClick={onAllWin}>Bust / All Win</Button>}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(RawPlayer);
