import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
  },
});
const ModalContent = ({ children, classes, className }) => (
  <div className={classNames(classes.root, className)} >
    {children}
  </div>
);
export default injectSheet(styles)(ModalContent);
