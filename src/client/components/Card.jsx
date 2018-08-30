import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    'box-shadow': '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    'border-radius': '2px',
  },
};

const RawCard = ({ classes, children, className }) => (
  <div className={classNames(classes.root, className)}>
    {children}
  </div>
);
export default withStyles(styles)(RawCard);
