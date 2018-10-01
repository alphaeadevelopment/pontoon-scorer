import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit}px`,
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});
const ModalContent = ({ children, classes, className }) => (
  <section className={classNames(classes.root, className)} >
    {children}
  </section>
);
export default injectSheet(styles)(ModalContent);
