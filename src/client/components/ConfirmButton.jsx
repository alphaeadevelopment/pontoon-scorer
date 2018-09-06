import React from 'react';
import injectSheet from 'react-jss';
// import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { Modal } from '../containers';
import Button from './Button';

const styles = {

};

export class RawConfirmButton extends React.Component {
  state = {
    showConfirm: false,
  }
  onClickButton = () => {
    this.setState({ showConfirm: true });
  }
  onConfirm = () => {
    const { onConfirm } = this.props;
    this.setState({ showConfirm: false });
    if (onConfirm) onConfirm();
  }
  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ showConfirm: false });
    if (onCancel) onCancel();
  }
  render() {
    const { showConfirm } = this.state;
    const { children, message = 'Confirm?', title = 'Confirmation', onConfirm, onCancel, ...rest } = this.props;
    return (
      <div>
        <Button onClick={this.onClickButton} {...rest}>
          {children}
        </Button>
        <Modal
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth='xs'
          aria-labelledby='confirmation-dialog-title'
          open={showConfirm}
        >
          <Modal.ModalTitle id='confirmation-dialog-title'>
            {title}
          </Modal.ModalTitle>
          <Modal.ModalContent>
            <Typography>
              {message}
            </Typography>
          </Modal.ModalContent>
          <Modal.ModalActions>
            <Button onClick={this.onCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.onConfirm} color='primary'>
              Ok
            </Button>
          </Modal.ModalActions>
        </Modal>
      </div>
    );
  }
}
export default injectSheet(styles)(RawConfirmButton);
