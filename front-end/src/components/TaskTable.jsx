import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 95,
  },
  { field: 'description', headerName: 'Description', width: 150 },
  {
    field: 'createdAt', headerName: 'created At', width: 150, type: 'date',
  },
  {
    field: 'status', headerName: 'Status', width: 150, type: 'singleSelect', valueOptions: ['Em andamento', 'Finalizada', 'Não iniciada'],
  },
  {
    field: 'dueDate', headerName: 'Due date', width: 150, type: 'date',
  },
  {
    field: 'updatedAt', headerName: 'Last modification', width: 150, type: 'date',
  },
];

const rows = [
  {
    id: 1, description: 'lavar louça', createdAt: '30-11-2020', status: 'Easdq', dueDate: '31-12-2020', updatedAt: '30-11-2020',
  },
];

function TaskTable() {
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}

export default TaskTable;
