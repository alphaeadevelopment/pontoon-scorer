import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Stake from './Stake';
import { RESULTS, GAME_PLAY } from '../lib/constants/game-phases';

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
    const { isDealer, classes, initialStake, hand, onSetStake, onBuyCard, onSplit, onWin, onLose, onWinDouble, onStick,
      isCurrentHand, gamePhase } = this.props;

    if (!hand.active) return null;
    return (
      <Paper className={classes.root}>
        {!isDealer &&
          <Stake isCurrentHand={isCurrentHand} gamePhase={gamePhase} hand={hand} initialStake={initialStake} onSetStake={onSetStake} onBuyCard={onBuyCard} />
        }
        <div>
          {
            isCurrentHand && gamePhase === GAME_PLAY &&
            <Button onClick={onSplit}>Split</Button>
          }
        </div>
        <div>
          {!isDealer && isCurrentHand && gamePhase === GAME_PLAY &&
            <Button onClick={onStick}>Stick</Button>
          }
          {!isDealer && gamePhase === RESULTS &&
            <Button onClick={onWin}>Win</Button>
          }
          {!isDealer && gamePhase === RESULTS &&
            <Button onClick={onLose}>Lose</Button>
          }
          {!isDealer && isCurrentHand && gamePhase === GAME_PLAY &&
            <Button onClick={onLose}>Bust</Button>
          }
          {!isDealer && gamePhase === RESULTS &&
            <Button onClick={onWinDouble}>Win x2</Button>
          }
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(RawHand);
