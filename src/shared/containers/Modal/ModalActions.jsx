import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};
const ModalActions = ({ children, classes, className }) => (
  <div className={classNames(className, classes.root)} >
    {children}
  </div>
);
export default injectSheet(styles)(ModalActions);
