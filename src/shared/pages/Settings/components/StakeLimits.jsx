import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { ValueRocker, Typography } from '../../../components';
import { isSettingsOpen, getMaximumStake, getMinimumStake } from '../settings-selectors';
import { closeSettings, setMinStake, setMaxStake } from '../settings-actions';

const headerStyles = theme => ({ header: { marginRight: theme.spacing.unit * 2 } });
const Header = injectSheet(headerStyles)(({ classes, children }) => (
  <Typography className={classes.header} variant={'subheading'}>
    {children}
  </Typography>
));

const styles = theme => ({
  root: {
  },
  limits: {
    'display': 'flex',
    'justifyContent': 'space-between',
    '&>div': {
      display: 'flex',
      justifyContent: ' flex-start',
      alignItems: 'center',
    },
  },
  minimum: {
    marginRight: theme.spacing.unit * 2,
  },
  maximum: {
    marginLeft: theme.spacing.unit * 2,
  },
});
@connect(
  state => ({
    open: isSettingsOpen(state),
    minimum: getMinimumStake(state),
    maximum: getMaximumStake(state),
  }),
  {
    onClose: closeSettings,
    setMinStake,
    setMaxStake,
  },
)
@injectSheet(styles)
class MinMaxStake extends Component {
  render() {
    const { classes, minimum, maximum, setMinStake, setMaxStake } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant={'subheading'}>
          {'Stake Limits'}
        </Typography>
        <div className={classes.limits}>
          <div
            className={classes.minimum}
          >
            <Header>
              Min:
            </Header>
            <ValueRocker
              minimum={1}
              maximum={maximum}
              onChange={setMinStake}
              value={minimum}
            />
          </div>
          <div className={classes.maximum}>
            <Header>
              Max:
            </Header>
            <ValueRocker
              className={classes.maximum}
              minimum={minimum}
              onChange={setMaxStake}
              value={maximum}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MinMaxStake;
