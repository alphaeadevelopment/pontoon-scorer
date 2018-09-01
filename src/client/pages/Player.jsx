/* globals window */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hand from './Hand';
import { InlineEditTextField, Card, Grid } from '../components';
import { DEALER_PONTOON } from '../lib/constants/game-phases';
import {
  getCurrentPlayer,
  getDealerIdx,
  getPhase,
  isBetweenRounds,
  isDealerHand,
} from '../selectors';
import {
  allLose,
  allWin,
  makeDealer,
  setPlayerName,
  startGameProper,
  stick,
} from '../actions';
import withSizeClasses from '../containers/withSizeClasses';

const styles = theme => ({
  root: {
    '$playerCard': {
      'padding': theme.spacing.unit,
    },
    '&$md $playerCard': {
      'padding': theme.spacing.unit * 2,
    },
    '&$xs $playerCard': {
      'padding': theme.spacing.unit,
    },
    '&$lg $playerCard': {
      'padding': theme.spacing.unit * 4,
    },
  },
  playerCard: {},
  playerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit,
  },
  negative: {
    background: '#f98f8f',
  },
  md: {},
  xs: {},
  lg: {},
});
@connect(
  state => ({
    betweenRounds: isBetweenRounds(state),
    dealerHand: isDealerHand(state),
    dealerIdx: getDealerIdx(state),
    gamePhase: getPhase(state),
    currentPlayer: getCurrentPlayer(state),
  }),
  {
    onAllLose: allLose.bind(null, { multiple: 1 }),
    onAllLoseDouble: allLose.bind(null, { multiple: 2 }),
    onAllWin: allWin,
    onChangePlayerName: setPlayerName,
    onDealerStick: stick.bind(null, 0),
    onMakeDealer: makeDealer,
    onStartGameProper: startGameProper,
  })
@injectSheet(styles)
@withSizeClasses
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentWillReceiveProps(nextProps) {
    const wasCurrentPlayer = this.isCurrentPlayer(this.props);
    const willBeCurrentPlayer = this.isCurrentPlayer(nextProps);
    if (!wasCurrentPlayer && willBeCurrentPlayer) {
      window.scrollTo(this.ref.current.offsetLeft, this.ref.current.offsetTop);
    }
  }
  onMakeDealer = () => {
    const { onMakeDealer, player } = this.props;
    onMakeDealer(player.idx);
  }
  onChangePlayerName = (name) => {
    this.props.onChangePlayerName({ playerIdx: this.props.player.idx, name });
  }
  isDealer = () => {
    const { player, dealerIdx } = this.props;
    const { idx: playerIdx } = player;
    return dealerIdx === playerIdx;
  }
  isCurrentPlayer = (propData = this.props) => {
    const { player, currentPlayer } = propData;
    const { idx: playerIdx } = player;

    return currentPlayer === playerIdx;
  }
  renderDealerHandActions = () => {
    const { onAllLose, onAllWin, onDealerStick } = this.props;
    return (
      <Fragment>
        <Button onClick={onDealerStick}>
          Stick
        </Button>
        <Button onClick={onAllLose}>
          All Lose
        </Button>
        <Button onClick={onAllWin}>
          Bust
        </Button>
      </Fragment>
    );
  }
  renderDealerPontoonActions = () => {
    const {
      onAllLoseDouble, onStartGameProper } = this.props;
    return (
      <Fragment>
        <Button onClick={onAllLoseDouble}>
          Pontoon
        </Button>
        <Button onClick={onStartGameProper}>
          Continue
        </Button>
      </Fragment>
    );
  }
  renderDealerActions = () => {
    const { gamePhase, dealerHand } = this.props;
    return (
      <Fragment>
        {gamePhase === DEALER_PONTOON && this.renderDealerPontoonActions()}
        {dealerHand && this.renderDealerHandActions()}
      </Fragment>
    );
  }
  renderPlayerActions = () => {
    const { betweenRounds } = this.props;
    return (
      <Fragment>
        {betweenRounds &&
          <Button onClick={this.onMakeDealer}>
            Make Dealer
          </Button>
        }
      </Fragment>
    );
  }
  render() {
    const { classes, className, player } = this.props;
    const isDealer = this.isDealer();
    return (
      <Grid
        item
        xs={isDealer ? 12 : 12}
        sm={isDealer ? 12 : 12}
        md={isDealer ? 12 : 4}
        lg={isDealer ? 12 : 3}
        xl={isDealer ? 12 : 2}
        className={classNames(classes.root, className)}
        ref={this.ref}
      >
        <Card
          className={classNames(classes.playerCard, { [classes.negative]: player.pot < 0 })}
        >
          {isDealer &&
            <Typography variant={'display1'}>
              Dealer
            </Typography>
          }
          <div className={classes.playerHeader}>
            <InlineEditTextField value={player.name} onChange={this.onChangePlayerName} />
            <Typography >
              {player.pot}
            </Typography>
          </div>
          {!isDealer && player.hands.map((h, handIdx) => (
            <Hand
              isCurrentPlayer={this.isCurrentPlayer()}
              key={handIdx}
              hand={h}
              idx={handIdx}
              player={player}
            />
          ))}
          {!isDealer && this.renderPlayerActions()}
          {isDealer && this.renderDealerActions()}
        </Card>
      </Grid>
    );
  }
}

export default Player;
