import React from 'react';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hand from './Hand';
import { InlineEditTextField } from '../components';
import { DEALER_PONTOON, DEALER_HAND, ROUND_OVER } from '../lib/constants/game-phases';

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
      onWin, onLose, onAllLoseDouble, onWinDouble, onAllLose, onAllWin, onStick, gamePhase, onStartGameProper,
      currentPlayer, currentPlayerHand, activeHandsInPlay } = this.props;
    const { idx: playerIdx } = player;
    const isCurrentPlayer = playerIdx === currentPlayer;
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
              isCurrentHand={isCurrentPlayer && currentPlayerHand === handIdx}
              key={handIdx}
              hand={h}
              initialStake={player.initialStake}
              onBuyCard={onBuyCard(handIdx)}
              onSetStake={onSetStake(handIdx)}
              onSplit={onSplit(handIdx)}
              onStick={onStick(handIdx)}
              onBust={onBust(handIdx)}
              onWin={onWin(handIdx)}
              onWinDouble={onWinDouble(handIdx)}
              gamePhase={gamePhase}
              onLose={onLose(handIdx)}
            />
          ))}
          {!isDealer && (gamePhase === ROUND_OVER || activeHandsInPlay === 0) && <Button onClick={onMakeDealer}>Make Dealer</Button>}
          {isDealer && gamePhase === DEALER_PONTOON && <Button onClick={onAllLoseDouble}>Pontoon</Button>}
          {isDealer && gamePhase === DEALER_PONTOON && <Button onClick={onStartGameProper}>Continue</Button>}
          {isDealer && gamePhase === DEALER_HAND && activeHandsInPlay > 0 && <Button onClick={onStick(0)}>Stick</Button>}
          {isDealer && gamePhase === DEALER_HAND && activeHandsInPlay > 0 && <Button onClick={onAllLose}>All Lose</Button>}
          {isDealer && gamePhase === DEALER_HAND && activeHandsInPlay > 0 && <Button onClick={onAllWin}>Bust</Button>}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(RawPlayer);
