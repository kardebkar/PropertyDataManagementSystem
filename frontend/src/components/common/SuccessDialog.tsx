import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


interface SuccessDialogProps {
    open: boolean;
    handleClose: () => void;
    handleOk: () => void;
    message: string;
  }

  
const SuccessDialog = ({ open, handleClose, handleOk, message }:SuccessDialogProps) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleOk} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default SuccessDialog;
