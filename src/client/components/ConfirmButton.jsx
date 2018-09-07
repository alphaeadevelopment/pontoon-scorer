import React from 'react';
import injectSheet from 'react-jss';
import { omit } from 'lodash';
import { Modal } from '../containers';
import Button from './Button';
import Typography from './Typography';

const styles = {

};

@injectSheet(styles)
class ConfirmButton extends React.Component {
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
        <Button onClick={this.onClickButton} {...omit(rest, ['theme'])}>
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
export default ConfirmButton;
