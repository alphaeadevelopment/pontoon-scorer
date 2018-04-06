import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

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
    value: getMinimum(this.props.initialStake, this.props.hand.lastBid),
    minimum: getMinimum(this.props.initialStake, this.props.hand.lastBid),
    maximum: getMaximum(this.props.initialStake, this.props.hand.lastBid),
  }
  componentWillReceiveProps = (nextProps) => {
    const minimum = getMinimum(nextProps.initialStake, nextProps.hand.lastBid);
    this.setState({
      minimum,
      value: minimum,
      maximum: getMaximum(nextProps.initialStake, nextProps.hand.lastBid),
    });
  }
  onChange = (ev) => {
    const { minimum, maximum } = this.state;
    let error;
    let num;
    try {
      num = Number(ev.target.value);
    }
    catch (e) {
      error = true;
    }
    if (isNaN(num) || num < minimum || num > maximum) error = true; // eslint-disable-line
    this.setState({
      value: ev.target.value,
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
    const { classes, hand } = this.props;
    const { value, minimum, maximum, error } = this.state;
    return (
      <div className={classes.root}>
        <Typography>Stake: {hand.stake}</Typography>
        <TextField tabIndex={0} className={classNames({ [classes.error]: error })} value={value} onChange={this.onChange} />
        {hand.stake === 0 && <Button onClick={this.onSetStake}>Set Stake</Button>}
        {hand.stake > 0 &&
          <Button onClick={this.onBuyCard}>
            Buy Card ({minimum}-{maximum})
          </Button>
        }
      </div>
    );
  }
}

export default withStyles(styles)(RawStake);
