import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth='xs'
          onEntering={this.handleEntering}
          aria-labelledby='confirmation-dialog-title'
          open={showConfirm}
        >
          <DialogTitle id='confirmation-dialog-title'>
            {title}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.onConfirm} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(RawConfirmButton);
