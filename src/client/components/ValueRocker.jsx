import React from 'react';
import classNames from 'classnames';
import Icon from 'react-ionicons';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';
import withSizeClasses from '../containers/withSizeClasses';

const styles = theme => ({
  root: {
    'display': 'flex',
    '& button': {
      'border': 0,
      'background-color': 'inherit',
      'cursor': 'pointer',
      'padding': 0,
      '& svg': {
        'width': '40px',
        'height': '40px',
      },
    },
    '&$md button svg': {
      width: '30px',
      height: '30px',
    },
  },
  value: {
    margin: theme.spacing.unit,
  },
  md: {},
});
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
  </Typography>
);

@injectSheet(styles)
@withSizeClasses
class ValueRocker extends React.Component {
  render() {
    const { className, classes, value, onChange, maximum, minimum } = this.props;
    return (
      <div className={classNames(classes.root, className)}>
        <Down disabled={value === minimum} onClick={() => onChange(value - 1)} />
        <Value value={value} className={classes.value} />
        <Up disabled={value === maximum} onClick={() => onChange(value + 1)} />
      </div>
    );
  }
}
export default ValueRocker;
