import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hand from './Hand';
import { InlineEditTextField } from '../components';
import { DEALER_PONTOON, DEALER_HAND, ROUND_OVER } from '../lib/constants/game-phases';
import {
  getDealerIdx,
  activeHandsInPlay as getActiveHandsInPlay,
  getPhase,
} from '../selectors';
import {
  setPlayerName,
  stick,
  allLose,
  allWin,
  makeDealer,
  startGameProper,
} from '../actions';

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
    const { classes, player, onChangePlayerName, onMakeDealer, dealerIdx,
      onAllLoseDouble, onAllLose, onAllWin, gamePhase, onStartGameProper,
      activeHandsInPlay, onDealerStick } = this.props;
    const { idx: playerIdx } = player;
    const isDealer = dealerIdx === playerIdx;
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
            <InlineEditTextField value={player.name} onChange={onChangePlayerName} />
            <Typography >{player.pot}</Typography>
          </div>
          {!isDealer && player.hands.map((h, handIdx) => (
            <Hand
              key={handIdx}
              hand={h}
              idx={handIdx}
              player={player}
            />
          ))}
          {!isDealer && (gamePhase === ROUND_OVER || activeHandsInPlay === 0) && <Button onClick={onMakeDealer}>Make Dealer</Button>}
          {isDealer && gamePhase === DEALER_PONTOON && <Button onClick={onAllLoseDouble}>Pontoon</Button>}
          {isDealer && gamePhase === DEALER_PONTOON && <Button onClick={onStartGameProper}>Continue</Button>}
          {isDealer && gamePhase === DEALER_HAND && activeHandsInPlay > 0 && <Button onClick={onDealerStick}>Stick</Button>}
          {isDealer && gamePhase === DEALER_HAND && activeHandsInPlay > 0 && <Button onClick={onAllLose}>All Lose</Button>}
          {isDealer && gamePhase === DEALER_HAND && activeHandsInPlay > 0 && <Button onClick={onAllWin}>Bust</Button>}
        </Paper>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  dealerIdx: getDealerIdx(state),
  activeHandsInPlay: getActiveHandsInPlay(state),
  gamePhase: getPhase(state),
});

const dispatchToActions = {
  onChangePlayerName: setPlayerName,
  onAllLose: allLose.bind(null, { multiple: 1 }),
  onAllLoseDouble: allLose.bind(null, { multiple: 2 }),
  onAllWin: allWin,
  onMakeDealer: makeDealer,
  onStartGameProper: startGameProper,
  onDealerStick: stick.bind(null, 0),
};

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawPlayer));
