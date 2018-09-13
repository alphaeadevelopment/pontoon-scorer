import React from 'react';
import injectSheet from 'react-jss';
import { Button, Typography } from '../components';
import Modal from './Modal';

const styles = theme => ({
  root: {

  },
  para: {
    margin: theme.spacing.unit * 2,
  },
});
export default injectSheet(styles)(({ classes, open, onLoadGame, onCancel }) => (
  <Modal open={open}>
    <Modal.Title>
      Load Saved Game?
    </Modal.Title>
    <Modal.Content>
      <Typography className={classes.para}>
        A previously saved game has been detected.
      </Typography>
      <Typography className={classes.para}>
        Would you like to continue with it?
      </Typography>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={onCancel}>
        No
      </Button>
      <Button onClick={onLoadGame}>
        Yes
      </Button>
    </Modal.Actions>
  </Modal>
));
