import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const axios = require('axios').default;

function DeleteAlert({
  open, isOpen, id, setId, fetchRows,
}) {
  const handleDeleteTask = async () => {
    await axios.delete(`http://localhost:3000/task/${id}`);
    isOpen(false);
    setId('');
    fetchRows();
  };

  return (
    <Dialog
      open={open}
      onClose={() => isOpen(false)}
    >
      <DialogTitle>
        Tem certeza que quer deletar a tarefa?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDeleteTask}>Sim</Button>
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
  id: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
  fetchRows: PropTypes.func.isRequired,
};

export default DeleteAlert;
