import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Stake from './Stake';
import { RESULTS, GAME_PLAY } from '../lib/constants/game-phases';
import {
  getDealerIdx,
  getCurrentPlayer,
  getCurrentPlayerHand,
  getPhase,
} from '../selectors';
import {
  addPlayer,
  newRound,
  resetGame,
  startGame,
  setPlayerName,
  setStake,
  buyCard,
  splitHand,
  stick,
  bustHand,
  handWins,
  handWinsDouble,
  handLoses,
  allLose,
  allWin,
  makeDealer,
  startGameProper,
} from '../actions';

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
  onSetStake = (stake) => {
    this.props.onSetStake({ ...this.getActionId(), stake });
  }
  onSplit = () => {
    this.props.onSplit(this.getActionId());
  }
  onStick = () => {
    this.props.onStick(this.getActionId());
  }
  onWin = () => {
    this.props.onWin(this.getActionId());
  }
  onLose = () => {
    this.props.onLose(this.getActionId());
  }
  onBuyCard = (stake) => {
    this.props.onBuyCard({ ...this.getActionId(), stake });
  }
  onWinDouble = () => {
    this.props.onWinDouble(this.getActionId());
  }
  onBust = () => {
    this.props.onBust(this.getActionId());
  }
  getActionId = () => ({ playerIdx: this.props.player.idx, handIdx: this.props.idx })
  render() {
    const { classes, hand, idx: handIdx, player, dealerIdx, currentPlayer, currentPlayerHand, gamePhase } = this.props;

    if (!hand.active) return null;
    const { initialStake, idx: playerIdx } = player;
    const isDealer = playerIdx === dealerIdx;
    const isCurrentPlayer = currentPlayer === playerIdx;
    const isCurrentHand = isCurrentPlayer && handIdx === currentPlayerHand;
    return (
      <Paper className={classes.root}>
        {!isDealer &&
          <Stake isCurrentHand={isCurrentHand} gamePhase={gamePhase} hand={hand} initialStake={initialStake} onSetStake={this.onSetStake} onBuyCard={this.onBuyCard} />
        }
        <div>
          {
            isCurrentHand && gamePhase === GAME_PLAY &&
            <Button onClick={this.onSplit}>Split</Button>
          }
        </div>
        <div>
          {!isDealer && isCurrentHand && gamePhase === GAME_PLAY &&
            <Button onClick={this.onStick}>Stick</Button>
          }
          {!isDealer && gamePhase === RESULTS &&
            <Button onClick={this.onWin}>Win</Button>
          }
          {!isDealer && gamePhase === RESULTS &&
            <Button onClick={this.onLose}>Lose</Button>
          }
          {!isDealer && isCurrentHand && gamePhase === GAME_PLAY &&
            <Button onClick={this.onLose}>Bust</Button>
          }
          {!isDealer && gamePhase === RESULTS &&
            <Button onClick={this.onWinDouble}>Win x2</Button>
          }
        </div>
      </Paper>
    );
  }
}
const mapStateToProps = state => ({
  dealerIdx: getDealerIdx(state),
  currentPlayer: getCurrentPlayer(state),
  currentPlayerHand: getCurrentPlayerHand(state),
  gamePhase: getPhase(state),
});

const dispatchToActions = {
  onAddPlayer: addPlayer,
  onNewRound: newRound,
  onResetGame: resetGame,
  onStartGame: startGame,
  onChangePlayerName: setPlayerName,
  onSetStake: setStake,
  onBuyCard: buyCard,
  onSplit: splitHand,
  onStick: stick,
  onBust: bustHand,
  onWin: handWins,
  onWinDouble: handWinsDouble,
  onLose: handLoses,
  onAllLose: allLose.bind(null, { multiple: 1 }),
  onAllLoseDouble: allLose.bind(null, { multiple: 2 }),
  onAllWin: allWin,
  onMakeDealer: makeDealer,
  onStartGameProper: startGameProper,
};

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawHand));
