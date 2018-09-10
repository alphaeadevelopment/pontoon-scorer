import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import omit from 'lodash.omit';

const transitionDuration = 300;

const styles = theme => ({
  root: {
    'position': 'relative',
    'background': 'transparent',
    'transition': `background ${transitionDuration / 1000}s`,
    'text-transform': 'uppercase',
    'border': 0,
    'font-size': '0.875rem',
    'line-height': '1.4em',
    'color': 'rgba(0, 0, 0, 0.8)',
    '&:not($disabled):hover': {
      'background': theme.palette.grey[300],
      'cursor': 'pointer',
    },
    '&$disabled': {
      'color': theme.palette.grey[600],
    },
    'padding': `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  disabled: {},
});
@injectSheet(styles)
class Button extends React.Component {
  render() {
    const { classes, className, children, disabled, secondary, primary, ...rest } = this.props;
    const buttonClasses = {
      [classes.secondary]: secondary,
      [classes.primary]: primary,
      [classes.disabled]: disabled,
    };
    return (
      <button className={classNames(classes.root, className, buttonClasses)} disabled={disabled} {...omit(rest, 'theme')}>
        <span className={classes.content}>
          {children}
        </span>
      </button>
    );
  }
}
export default Button;
