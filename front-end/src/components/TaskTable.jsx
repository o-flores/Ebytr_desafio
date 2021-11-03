import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/Delete';

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
        onClick={() => console.log(params.id)}
      />,
    ],
  },
];

const rows = [
  {
    id: 1, description: 'lavar louça', createdAt: '2020-11-30', status: 'Finalizada', dueDate: '2020-12-30', updatedAt: '2020-11-30',
  },
  {
    id: 2, description: 'lavar louça', createdAt: '2020-11-30', status: 'Finalizada', dueDate: '2020-12-30', updatedAt: '2020-11-30',
  },
];

function TaskTable() {
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
    console.log(values);
    // fazer a chamada para a api para atualizar uma tarefa
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
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
    </div>
  );
}

export default TaskTable;
