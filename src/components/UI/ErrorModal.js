import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ErrorModal(props) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.errorName}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.errorMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
