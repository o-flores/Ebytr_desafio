import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function DeleteAlert({ open, isOpen }) {
  return (
    <Dialog
      open={open}
      onClose={() => isOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Tem certeza que quer deletar a tarefa?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => isOpen(false)}>Sim</Button>
        <Button onClick={() => isOpen(false)} autoFocus>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  isOpen: PropTypes.func.isRequired,
};

export default DeleteAlert;
