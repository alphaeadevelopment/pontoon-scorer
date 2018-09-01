import React from 'react';
import classNames from 'classnames';
import Icon from 'react-ionicons';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';

const styles = {
  root: {
    'display': 'flex',
    '& button': {
      'border': 0,
      'background-color': 'inherit',
    },
  },
  value: {
    margin: '10px',
  },
};
const IconButton = ({ onClick, icon, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    <Icon icon={icon} color={disabled ? 'lightgrey' : 'black'} />
  </button>
);
const Up = props => <IconButton {...props} icon={'md-arrow-dropup-circle'} />;
const Down = props => <IconButton {...props} icon={'md-arrow-dropdown-circle'} />;
const Value = ({ value, className }) => (
  <Typography className={className}>
    {value}
  </Typography>);

const ValueRocker = ({ className, classes, value, onChange, maximum, minimum }) => (
  <div className={classNames(classes.root, className)}>
    <Down disabled={value === minimum} onClick={() => onChange(value - 1)} />
    <Value value={value} className={classes.value} />
    <Up disabled={value === maximum} onClick={() => onChange(value + 1)} />
  </div>
);
export default injectSheet(styles)(ValueRocker);
