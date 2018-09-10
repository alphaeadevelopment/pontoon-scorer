import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import includes from 'lodash.includes';
import Stake from './Stake';
import { RESULTS, GAME_PLAY, DEALER_HAND } from '../lib/constants/game-phases';
import {
  getCurrentPlayerHand,
  getDealerIdx,
  getPhase,
} from '../selectors';
import {
  addPlayer,
  allLose,
  allWin,
  bustHand,
  buyCard,
  handLoses,
  handWins,
  handWinsDouble,
  makeDealer,
  newRound,
  resetGame,
  setPlayerName,
  setStake,
  splitHand,
  startGame,
  startGameProper,
  stick,
} from '../actions';
import { Card, Button } from '../components';
import withSizeClasses from '../containers/withSizeClasses';

const styles = theme => ({
  root: {
    'padding': theme.spacing.unit * 2,
    'display': 'flex',
    'flexDirection': 'column',
    'margin': `${theme.spacing.unit}px 0`,
    '&$md': {
      padding: theme.spacing.unit,
    },
  },
  handActions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexFlow: 'row wrap',
  },
  stakeCtr: {
    '& input': {
      width: '3em',
    },
  },
  md: {},
});

@connect(
  state => ({
    currentPlayerHand: getCurrentPlayerHand(state),
    dealerIdx: getDealerIdx(state),
    gamePhase: getPhase(state),
  }),
  {
    onAddPlayer: addPlayer,
    onAllLose: allLose.bind(null, { multiple: 1 }),
    onAllLoseDouble: allLose.bind(null, { multiple: 2 }),
    onAllWin: allWin,
    onBust: bustHand,
    onBuyCard: buyCard,
    onChangePlayerName: setPlayerName,
    onLose: handLoses,
    onMakeDealer: makeDealer,
    onNewRound: newRound,
    onResetGame: resetGame,
    onSetStake: setStake,
    onSplit: splitHand,
    onStartGame: startGame,
    onStartGameProper: startGameProper,
    onStick: stick,
    onWin: handWins,
    onWinDouble: handWinsDouble,
  })
@injectSheet(styles)
@withSizeClasses
class Hand extends React.Component {
  onSetStake = (stake) => {
    this.invokeActionOnPlayerHand(this.props.onSetStake, { stake });
  }
  onSplit = () => {
    this.invokeActionOnPlayerHand(this.props.onSplit);
  }
  onStick = () => {
    this.invokeActionOnPlayerHand(this.props.onStick);
  }
  onWin = () => {
    this.invokeActionOnPlayerHand(this.props.onWin);
  }
  onLose = () => {
    this.invokeActionOnPlayerHand(this.props.onLose, { multiple: 1 });
  }
  onLoseDouble = () => {
    this.invokeActionOnPlayerHand(this.props.onLose, { multiple: 2 });
  }
  onBuyCard = (stake) => {
    this.invokeActionOnPlayerHand(this.props.onBuyCard, { stake });
  }
  onWinDouble = () => {
    this.invokeActionOnPlayerHand(this.props.onWinDouble);
  }
  onBust = () => {
    this.invokeActionOnPlayerHand(this.props.onBust);
  }
  getActionId = () => ({ playerIdx: this.props.player.idx, handIdx: this.props.idx })
  invokeActionOnPlayerHand = (action, args = {}) => {
    action.apply(null, [{ ...this.getActionId(), ...args }]);
  }
  isDealer = () => {
    const { hand, player, dealerIdx } = this.props;

    if (!hand.active) return null;
    const { idx: playerIdx } = player;

    return playerIdx === dealerIdx;
  }
  isCurrentHand = () => {
    const { idx: handIdx, currentPlayerHand, isCurrentPlayer } = this.props;

    return isCurrentPlayer && handIdx === currentPlayerHand;
  }
  renderGamePlayActions = () => (
    <Fragment>
      <Button onClick={this.onStick}>
        Stick
      </Button>
      <Button onClick={this.onLose}>
        Bust
      </Button>
      <Button onClick={this.onWinDouble}>
        Pontoon
      </Button>
    </Fragment>
  )
  renderResultsActions = () => (
    <Fragment>
      <Button onClick={this.onWin}>
        Win
      </Button>
      <Button onClick={this.onLose}>
        Lose
      </Button>
      <Button onClick={this.onWinDouble}>
        5-Card Trick
      </Button>
    </Fragment>
  )
  renderPlayerActions = () => {
    const { hand, gamePhase } = this.props;

    if (!hand.active) return null;
    return (
      <Fragment>
        {this.isCurrentHand() && gamePhase === GAME_PLAY && this.renderGamePlayActions()}
        {gamePhase === RESULTS && this.renderResultsActions()}
      </Fragment>
    );
  }
  render() {
    const {
      classes, hand, idx: handIdx, player, dealerIdx, isCurrentPlayer, currentPlayerHand, gamePhase,
    } = this.props;

    if (!hand.active) return null;
    const { initialStake, idx: playerIdx } = player;
    const isDealer = playerIdx === dealerIdx;
    const isCurrentHand = isCurrentPlayer && handIdx === currentPlayerHand;
    return (
      <Card className={classes.root}>
        {!isDealer &&
          <Stake
            isCurrentHand={isCurrentHand}
            gamePhase={gamePhase}
            hand={hand}
            initialStake={initialStake}
            onSetStake={this.onSetStake}
            onBuyCard={this.onBuyCard}
          />
        }
        <div className={classes.handActions}>
          {
            isCurrentHand && includes([GAME_PLAY, DEALER_HAND], gamePhase) &&
            <Button onClick={this.onSplit}>
              Split
            </Button>
          }
          {!isDealer && this.renderPlayerActions()}
        </div>
      </Card>
    );
  }
}

export default Hand;
