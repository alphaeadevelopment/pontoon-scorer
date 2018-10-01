import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});
const ModalActions = ({ children, classes, className }) => (
  <div className={classNames(className, classes.root)} >
    {children}
  </div>
);
export default injectSheet(styles)(ModalActions);
