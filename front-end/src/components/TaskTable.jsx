import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import DeleteAlert from './DeleteAlert';
import CreateTaskForm from './CreateTaskForm';

const axios = require('axios').default;

function TaskTable() {
  const [rows, setRows] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isCreateTaskFormOpen, setIsCreateTaskFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [nextId, setNextId] = useState('');

  const handleRenderDeleteAlert = (id) => {
    setIsDeleteAlertOpen(true);
    setDeleteId(id);
  };

  const tableColumns = [
    {
      field: 'id', headerName: 'ID', width: 95,
    },
    {
      field: 'description', headerName: 'Description', width: 150, editable: true,
    },
    {
      field: 'createdAt', headerName: 'created At', width: 150, type: 'date',
    },
    {
      field: 'status', headerName: 'Status', width: 150, type: 'singleSelect', valueOptions: ['Em andamento', 'Finalizada', 'Não iniciada'], editable: true,
    },
    {
      field: 'dueDate', headerName: 'Due date', width: 150, type: 'date', editable: true,
    },
    {
      field: 'updatedAt', headerName: 'Last modification', width: 150, type: 'date',
    },
    {
      field: 'actions',
      type: 'actions',
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleRenderDeleteAlert(params.id)}
        />,
      ],
    },
  ];

  const fetchRows = async () => {
    const { data } = await axios.get('http://localhost:3000/tasks');
    setRows(data);
  };

  const fetchNextId = async () => {
    const { data } = await axios.get('http://localhost:3000/task/lastId');
    setNextId(String(Number(data[0].id) + 1));
  };
  useEffect(() => {
    fetchRows();
    fetchNextId();
  }, []);

  const handleEditStop = (params) => {
    const { getValue, id, columns } = params;
    const columnsName = columns.map((key) => key.field);
    const values = {};

    for (let i = 0; i < columnsName.length; i += 1) {
      const key = columnsName[i];
      if (columnsName[i] !== 'id' && columnsName[i] !== 'actions') {
        values[key] = getValue(id, key);
      }
    }
    // console.log(values);
    // fazer a chamada para a api para atualizar uma tarefa
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Button onClick={() => setIsCreateTaskFormOpen(true)}>
        Create task
      </Button>
      <DataGrid
        rows={rows}
        columns={tableColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
        disableMultipleSelection
        editMode="row"
        onRowEditStop={handleEditStop}
      />
      <DeleteAlert
        open={isDeleteAlertOpen}
        isOpen={setIsDeleteAlertOpen}
        id={deleteId}
        setId={setDeleteId}
        fetchRows={fetchRows}
      />
      <CreateTaskForm
        open={isCreateTaskFormOpen}
        isOpen={setIsCreateTaskFormOpen}
        nextId={nextId}
        setNextId={fetchNextId}
        fetchRows={fetchRows}
      />
    </div>
  );
}

export default TaskTable;
