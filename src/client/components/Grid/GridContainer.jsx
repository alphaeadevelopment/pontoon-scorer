import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = {
  container: {
    'padding': '16px',
    'display': 'flex',
    'flex-wrap': 'wrap',
  },
};


const RawGrid = ({ children, classes, className }) => (
  <div className={classNames(classes.container, className)}>
    {children}
  </div>
);

export default injectSheet(styles)(RawGrid);
