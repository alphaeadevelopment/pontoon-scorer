import React from 'react';
import { connect } from 'react-redux';
import includes from 'lodash.includes';
import injectSheet from 'react-jss';
import { ValueRocker, Button, Typography } from '../../../components';
import { GAME_PLAY, SET_STAKE } from '../../../lib/constants/game-phases';
import { getMaximumStake, getMinimumStake } from '../../../lib/game-logic/stake-limits';
import { getGameSettings } from '../gameSelectors';

const styles = theme => ({
  root: {
    '& input': {
      width: '3em',
    },
  },
  error: {
    background: 'red',
  },
  valueSelection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  valueRocker: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

@connect(
  state => ({
    minimumStake: getGameSettings(state).stake.minimum,
    maximumStake: getGameSettings(state).stake.maximum,
  }),
)
@injectSheet(styles)
class Stake extends React.Component {
  state = {
    maximum: getMaximumStake(this.props.maximumStake, this.props.initialStake, this.props.hand.lastBid),
    minimum: getMinimumStake(this.props.minimumStake, this.props.initialStake, this.props.hand.lastBid),
    value: getMinimumStake(this.props.minimumStake, this.props.initialStake, this.props.hand.lastBid),
  }
  componentWillReceiveProps = (nextProps) => {
    const minimum = getMinimumStake(this.props.minimumStake, nextProps.initialStake, nextProps.hand.lastBid);
    this.setState({
      minimum,
      value: minimum,
      maximum: getMaximumStake(this.props.maximumStake, nextProps.initialStake, nextProps.hand.lastBid),
    });
  }
  onChange = (value) => {
    const { minimum, maximum } = this.state;
    let error;
    let num;
    try {
      num = Number(value);
    }
    catch (e) {
      error = true;
    }
    if (isNaN(num) || num < minimum || num > maximum) error = true; // eslint-disable-line
    this.setState({
      value,
      error,
    });
  }
  onSetStake = () => {
    const { error, value, minimum, maximum } = this.state;
    if (!error) {
      const stake = Number(value);
      if (stake >= minimum && stake <= maximum) {
        this.props.onSetStake(stake);
        this.setState({ value: minimum });
      }
    }
  }
  onBuyCard = () => {
    const { error, value, minimum, maximum } = this.state;
    if (!error) {
      const stake = Number(value);
      if (stake >= minimum && stake <= maximum) {
        this.props.onBuyCard(stake);
        this.setState({ value: minimum });
      }
    }
  }
  onUpdateValue = (value) => {
    this.setState({ value });
  }
  render() {
    const { classes, hand, gamePhase, isCurrentHand } = this.props;
    const { value, minimum, maximum } = this.state;
    return (
      <div className={classes.root}>
        <Typography>
          Stake:
          {' '}
          {hand.stake}
        </Typography>
        <div className={classes.valueSelection}>
          {includes([SET_STAKE, GAME_PLAY], gamePhase) && isCurrentHand &&
            <ValueRocker
              className={classes.valueRocker}
              value={value}
              onChange={this.onUpdateValue}
              maximum={maximum}
              minimum={minimum}
            />
          }
          {gamePhase === SET_STAKE && hand.stake === 0 && isCurrentHand &&
            <Button onClick={this.onSetStake}>
              Set Stake
            </Button>
          }
          {gamePhase === GAME_PLAY && hand.stake > 0 && isCurrentHand &&
            <Button onClick={this.onBuyCard}>
              Buy Card
            </Button>
          }
        </div>
      </div>
    );
  }
}

export default Stake;
