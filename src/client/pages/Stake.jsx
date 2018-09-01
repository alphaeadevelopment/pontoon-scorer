import React from 'react';
import { includes } from 'lodash';
import injectSheet from 'react-jss';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { ValueRocker } from '../components';
import { GAME_PLAY, SET_STAKE } from '../lib/constants/game-phases';
import { getMaximumStake, getMinimumStake } from '../lib/game-logic/stake-limits';


const styles = () => ({
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
    margin: '10px 0',
  },
});

@injectSheet(styles)
class Stake extends React.Component {
  state = {
    maximum: getMaximumStake(this.props.initialStake, this.props.hand.lastBid),
    minimum: getMinimumStake(this.props.initialStake, this.props.hand.lastBid),
    value: getMinimumStake(this.props.initialStake, this.props.hand.lastBid),
  }
  componentWillReceiveProps = (nextProps) => {
    const minimum = getMinimumStake(nextProps.initialStake, nextProps.hand.lastBid);
    this.setState({
      minimum,
      value: minimum,
      maximum: getMaximumStake(nextProps.initialStake, nextProps.hand.lastBid),
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
