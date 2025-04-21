import { Grid, Paper, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function TaskTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isCardView = isMobile || isTablet;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [location]);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEdit = (task) => {
    navigate('/add', { state: task });
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'position', headerName: 'Position', flex: 1 },
    { field: 'taskName', headerName: 'Task', flex: 1 },
    { field: 'assignedBy', headerName: 'Assigned By', flex: 1 },
    { field: 'startDate', headerName: 'Start', flex: 1 },
    { field: 'deadline', headerName: 'Deadline', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 }, 
    { field: 'city', headerName: 'City', flex: 1 }, 
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === 'Completed' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {params.value}
        </span>
      ),
    },
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
      {isCardView ? (
        tasks.map((task, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper sx={{ p: 2 }}>
              {Object.entries(task).map(([key, value]) => {
                if (key === 'id') return null;
                const label = key === 'taskName' ? 'Task' : key.charAt(0).toUpperCase() + key.slice(1);
                if (key === 'status') {
                  return (
                    <Typography key={key} variant="body2" sx={{ fontWeight: 600 }}>
                      Status:{' '}
                      <span style={{ color: value === 'Completed' ? 'green' : 'red', fontWeight: 600 }}>
                        {value}
                      </span>
                    </Typography>
                  );
                }
                return (
                  <Typography key={key} variant="body2" sx={{ fontWeight: 600 }}>
                    {label}:{' '}
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
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                textAlign: 'left',
                backgroundColor: 'skyblue',
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