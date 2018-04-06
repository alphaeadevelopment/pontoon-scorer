import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Stake from './Stake';

const styles = theme => ({
  root: {
    'padding': theme.spacing.unit * 2,
    'display': 'flex',
    'flexDirection': 'column',
    'margin': `${theme.spacing.unit * 2}px 0`,
  },
  stakeCtr: {
    '& input': {
      width: '3em',
    },
  },
});

class RawHand extends React.Component {
  render() {
    const { isDealer, classes, initialStake, hand, onSetStake, onBuyCard, onSplit, onWin, onLose, onWinDouble } = this.props;
    return (
      <Paper className={classes.root}>
        {!isDealer &&
          <Stake hand={hand} initialStake={initialStake} onSetStake={onSetStake} onBuyCard={onBuyCard} />
        }
        <div>
          <Button onClick={onSplit}>Split</Button>
        </div>
        <div>
          {!isDealer &&
            <Button onClick={onWin}>Win</Button>
          }
          {!isDealer &&
            <Button onClick={onLose}>Lose</Button>
          }
          {!isDealer &&
            <Button onClick={onWinDouble}>Win x2</Button>
          }
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(RawHand);
