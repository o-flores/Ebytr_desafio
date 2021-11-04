import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

function CreateTaskForm({ open, isOpen }) {
  return (
    <Dialog
      open={open}
      onClose={() => isOpen(false)}
    >
      <DialogTitle>
        Crie a tarefa
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para criar a tarefa digite as informações necessárias.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Descrição"
          type="text"
          fullWidth
          variant="filled"
          required
        />
        <TextField
          margin="dense"
          label="Prazo"
          type="text"
          fullWidth
          variant="filled"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => isOpen(false)}>Criar</Button>
        <Button onClick={() => isOpen(false)}>Voltar</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateTaskForm.propTypes = {
  open: PropTypes.bool.isRequired,
  isOpen: PropTypes.func.isRequired,
};

export default CreateTaskForm;
