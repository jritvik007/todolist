import { Grid, Paper, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskTable() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksWithIds = storedTasks.map((task, index) => ({ ...task, id: index }));
    setTasks(tasksWithIds);
  }, []);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    navigate('/add', { state: task });
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'taskName', headerName: 'Task', width: 200 },
    { field: 'assignedBy', headerName: 'Assigned By', width: 180 },
    { field: 'startDate', headerName: 'Start', width: 150 },
    { field: 'deadline', headerName: 'Deadline', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {isMobile ? (
        tasks.map((task, index) => (
          <Grid item xs={12} key={index}>
            <Paper sx={{ p: 2 }}>
              {Object.entries(task).map(([key, value]) => {
                if (key === 'id') return null;
                if (key === 'taskName') key = 'Task';
                return (
                  <Typography key={key} variant="body2" sx={{ fontWeight: 600 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                    <span style={{ fontWeight: 400 }}>{value}</span>
                  </Typography>
                );
              })}
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>
                Actions:
                <IconButton onClick={() => handleEdit(task)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(task.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </Paper>
          </Grid>
        ))
      ) : (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            autoHeight
            disableColumnResize
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
              },
              overflowX: 'hidden',
              '& .MuiDataGrid-root': {
                overflowX: 'hidden',
              },
            }}
          />
        </div>
      )}
    </Grid>
  );
}

export default TaskTable;
