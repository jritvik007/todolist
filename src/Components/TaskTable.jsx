import { Grid, Paper, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function TaskTable({ filterField, filterValue }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isCardView = isMobile || isTablet;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [location]);

  useEffect(() => {
    let filtered = [...tasks];
  
    if (filterField && filterValue) {
      const value = filterValue.toLowerCase();
      filtered = filtered.filter(task => {
        const taskFieldValue = task[filterField];
        return typeof taskFieldValue === "string" && taskFieldValue.toLowerCase().includes(value);
      });
    }
  
    setFilteredTasks(filtered);
  }, [filterField, filterValue, tasks]);
  

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
    { field: 'startDate', headerName: 'Start Date', width: 100 ,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    { field: 'deadline', headerName: 'Deadline', width: 100 ,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 }, 
    { field: 'city', headerName: 'City', flex: 1 }, 
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
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
      width: 100,
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
    <Grid container spacing={2}>
      {isCardView ? (
        filteredTasks.map((task, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{width:"100%"}}>
            <Paper sx={{ p: 4 , boxShadow: 3  }}>
            {Object.entries(task).map(([key, value]) => {
            if (key === 'id') return null;
             const label = key === 'taskName' ? 'Task' : key.charAt(0).toUpperCase() + key.slice(1);

             let displayValue = value;

             if (key === 'startDate' || key === 'deadline') {
             const date = new Date(value);
             displayValue = date.toLocaleDateString('en-GB', {
             day: '2-digit',
             month: 'short',
             year: 'numeric',
             });
             }
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
           <span style={{ fontWeight: 400 }}>{displayValue}</span>
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
            rows={filteredTasks}
            columns={columns}
            autoHeight
            disableColumnMenu
            disableColumnSorting
            disableColumnResize
            hideFooter
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                textAlign: 'left',
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