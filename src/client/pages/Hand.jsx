import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    'padding': theme.spacing.unit * 2,
    'display': 'flex',
    'flexDirection': 'column',
  },
  stakeCtr: {
    '& input': {
      width: '3em',
    },
  },
});

class RawHand extends React.Component {
  render() {
    const { isDealer, classes, hand, onSetStake, onSplit, onWin, onLose, onWinDouble } = this.props;
    return (
      <Paper className={classes.root}>
        {!isDealer &&
          <div className={classes.stakeCtr}>
            <TextField value={hand.stake} onChange={e => onSetStake(e.target.value)} />
          </div>
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
