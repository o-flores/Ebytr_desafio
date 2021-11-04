import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import DeleteAlert from './DeleteAlert';
import CreateTaskForm from './CreateTaskForm';

const axios = require('axios').default;

const useStyles = makeStyles({
  root: {
    '& .rows': {
      color: '#808080',
    },
    '& .column-header': {
      fontSize: 15,
    },
  },
});

function TaskTable() {
  const [rows, setRows] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isCreateTaskFormOpen, setIsCreateTaskFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [nextId, setNextId] = useState('');
  const classes = useStyles();

  const handleRenderDeleteAlert = (id) => {
    setIsDeleteAlertOpen(true);
    setDeleteId(id);
  };

  const tableColumns = [
    {
      field: 'id', headerName: 'ID', width: 10, headerClassName: 'column-header',
    },
    {
      field: 'description', headerName: 'Descrição', editable: true, flex: 1, headerAlign: 'center', headerClassName: 'column-header',
    },
    {
      field: 'createdAt', headerName: 'Criada em', type: 'date', flex: 0.25, headerClassName: 'column-header',
    },
    {
      field: 'status', headerName: 'Status', flex: 0.25, width: 150, type: 'singleSelect', valueOptions: ['Em andamento', 'Finalizada', 'Não iniciada'], editable: true, headerClassName: 'column-header',
    },
    {
      field: 'dueDate', headerName: 'Prazo', flex: 0.25, type: 'date', editable: true, headerClassName: 'column-header',
    },
    {
      field: 'updatedAt', headerName: 'Modificado em', flex: 0.25, type: 'date', headerClassName: 'column-header',
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

  const updateRow = async (id, payload) => {
    await axios.put(`http://localhost:3000/task/${id}`, payload);
    fetchRows();
  };

  const fetchNextId = async () => {
    const { data } = await axios.get('http://localhost:3000/task/lastId');
    setNextId(String(Number(data[0].id) + 1));
  };
  useEffect(() => {
    fetchRows();
    fetchNextId();
  }, []);

  const handleEditStop = async (params) => {
    const { getValue, id, columns } = params;
    const columnsName = columns.map((key) => key.field);
    const values = {};
    const editableHeaders = ['description', 'status', 'dueDate'];

    for (let i = 0; i < columnsName.length; i += 1) {
      const key = columnsName[i];
      if (editableHeaders.includes(columnsName[i]) || columnsName[i] === 'createdAt') {
        values[key] = getValue(id, key);
      }
    }
    values.updatedAt = new Date();

    await updateRow(id, values);
  };

  return (
    <div style={{
      width: '80%', margin: 'auto', backgroundColor: '#fff', borderRadius: 10,
    }}
    >
      <Button onClick={() => setIsCreateTaskFormOpen(true)}>
        Create task
      </Button>
      <DataGrid
        rows={rows}
        columns={tableColumns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
        disableMultipleSelection
        editMode="row"
        onRowEditStop={handleEditStop}
        className={classes.root}
        getRowClassName={() => 'rows'}
      />
      <DeleteAlert
        open={isDeleteAlertOpen}
        isOpen={setIsDeleteAlertOpen}
        id={deleteId}
        setId={setDeleteId}
        fetchRows={fetchRows}
        setNextId={fetchNextId}
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
