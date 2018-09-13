import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Modal } from '../../containers';
import StakeLimits from './components/StakeLimits';
import { closeSettings } from './settings-actions';
import { isSettingsOpen } from './settings-selectors';
import { Button } from '../../components';

const styles = {
  root: {

  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

@connect(
  state => ({
    open: isSettingsOpen(state),
  }),
  {
    onClose: closeSettings,
  },
)
@injectSheet(styles)
class Settings extends Component {
  render() {
    const { classes, open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose} className={classes.root} disableBackdropClick>
        <Modal.Title>
          Settings
        </Modal.Title>
        <Modal.Content>
          <StakeLimits />
        </Modal.Content>
        <Modal.Actions className={classes.buttons}>
          <Button onClick={onClose}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default Settings;
