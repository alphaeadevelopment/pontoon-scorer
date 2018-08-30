import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hand from './Hand';
import { InlineEditTextField, Card } from '../components';
import { DEALER_PONTOON } from '../lib/constants/game-phases';
import {
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
  onMakeDealer = () => {
    const { onMakeDealer, player } = this.props;
    onMakeDealer(player.idx);
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
    const { classes, player, onChangePlayerName, dealerIdx } = this.props;
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
        <Card
          className={classNames({ [classes.negative]: player.pot < 0 })}
        >
          {isDealer &&
            <Typography variant={'display1'}>
              Dealer
            </Typography>
          }
          <div className={classes.playerHeader}>
            <InlineEditTextField value={player.name} onChange={onChangePlayerName} />
            <Typography >
              {player.pot}
            </Typography>
          </div>
          {!isDealer && player.hands.map((h, handIdx) => (
            <Hand
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
const mapStateToProps = state => ({
  betweenRounds: isBetweenRounds(state),
  dealerHand: isDealerHand(state),
  dealerIdx: getDealerIdx(state),
  gamePhase: getPhase(state),
});

const dispatchToActions = {
  onAllLose: allLose.bind(null, { multiple: 1 }),
  onAllLoseDouble: allLose.bind(null, { multiple: 2 }),
  onAllWin: allWin,
  onChangePlayerName: setPlayerName,
  onDealerStick: stick.bind(null, 0),
  onMakeDealer: makeDealer,
  onStartGameProper: startGameProper,
};

export default connect(mapStateToProps, dispatchToActions)(withStyles(styles)(RawPlayer));
