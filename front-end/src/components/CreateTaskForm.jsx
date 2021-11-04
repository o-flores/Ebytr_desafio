import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function CreateTaskForm({ open, isOpen }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState({});

  const handleCreateTask = async () => {
    if (description.trim() === '') setFormError({ ...formError, description: true });
    else if (dueDate.trim() === '') setFormError({ ...formError, dueDate: true });
    else {
      setDescription('');
      setDueDate('');
      isOpen(false);
      setFormError({});
    }
  };

  const handleCloseButton = () => {
    setDescription('');
    setDueDate('');
    isOpen(false);
    setFormError({});
    isOpen(false);
  };
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
        <Box component="form">
          <TextField
            autoFocus
            margin="dense"
            label="Descrição"
            type="text"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={formError.description}
            helperText={formError.description ? 'Digite um valor válido' : ''}
          />
          <TextField
            margin="dense"
            label="Prazo"
            type="date"
            fullWidth
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            error={formError.dueDate}
            helperText={formError.dueDate ? 'Escolha uma data' : ''}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateTask}>Criar</Button>
        <Button onClick={handleCloseButton}>Voltar</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateTaskForm.propTypes = {
  open: PropTypes.bool.isRequired,
  isOpen: PropTypes.func.isRequired,
};

export default CreateTaskForm;
