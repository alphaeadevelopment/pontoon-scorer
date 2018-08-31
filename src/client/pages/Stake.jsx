import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { InlineEditTextField } from '../components';
import { GAME_PLAY, SET_STAKE } from '../lib/constants/game-phases';

const getMinimum = (initialStake) => {
  if (initialStake) {
    return initialStake;
  }
  return 1;
};
const getMaximum = (initialStake, lastBid) => {
  if (initialStake) {
    if (lastBid) {
      return lastBid;
    }
    return initialStake * 2;
  }
  return 5;
};

const styles = () => ({
  root: {
    '& input': {
      width: '3em',
    },
  },
  error: {
    background: 'red',
  },
});

class RawStake extends React.Component {
  state = {
    maximum: getMaximum(this.props.initialStake, this.props.hand.lastBid),
    minimum: getMinimum(this.props.initialStake, this.props.hand.lastBid),
    value: getMinimum(this.props.initialStake, this.props.hand.lastBid),
  }
  componentWillReceiveProps = (nextProps) => {
    const minimum = getMinimum(nextProps.initialStake, nextProps.hand.lastBid);
    this.setState({
      minimum,
      value: minimum,
      maximum: getMaximum(nextProps.initialStake, nextProps.hand.lastBid),
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
  render() {
    const { classes, hand, gamePhase, isCurrentHand } = this.props;
    const { value, minimum, maximum, error } = this.state;
    return (
      <div className={classes.root}>
        <Typography>
          Stake:
          {' '}
          {hand.stake}
        </Typography>
        <InlineEditTextField
          tabIndex={0}
          className={classNames({ [classes.error]: error })}
          value={value}
          onChange={this.onChange}
        />
        {gamePhase === SET_STAKE && hand.stake === 0 && isCurrentHand &&
          <Button onClick={this.onSetStake}>
            Set Stake
          </Button>
        }
        {gamePhase === GAME_PLAY && hand.stake > 0 && isCurrentHand &&
          <Button onClick={this.onBuyCard}>
            Buy Card (
            {minimum}
            -
            {maximum}
            )
          </Button>
        }
      </div>
    );
  }
}

export default injectSheet(styles)(RawStake);
