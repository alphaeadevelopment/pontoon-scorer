import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import { Typography } from '../../components';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
});
const ModalTitle = ({ children, classes, className }) => (
  <Typography className={classNames(classes.root, className)} variant={'display4'} >
    {children}
  </Typography>
);
export default injectSheet(styles)(ModalTitle);
