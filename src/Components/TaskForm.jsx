import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, CssBaseline, Box, Container, Paper,
  Button, TextField, MenuItem, Grid, IconButton, Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

const locations = {
  USA: {
    California: ['Los Angeles', 'San Diego', 'San Francisco'],
    Texas: ['Houston', 'Austin', 'Dallas'],
    'New York': ['New York City', 'Buffalo', 'Rochester']
  },
  India: {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Mangalore'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra']
  }
};

function TaskForm({ onSubmit, taskToEdit }) {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '', email: '', phone: '', department: '',
    position: '', country: '', state: '', city: '',
    taskName: '', assignedBy: '',
    startDate: null, deadline: null, status: 'Pending'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTask({ ...taskToEdit });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedTask = { ...task, [name]: value };

    if (name === 'country') {
      updatedTask.state = '';
      updatedTask.city = '';
    } else if (name === 'state') {
      updatedTask.city = '';
    }

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        updatedTask[name] = digitsOnly;
      } else {
        return;
      }
    }

    setTask(updatedTask);
    setErrors({ ...errors, [name]: '' });
  };

  const handleDateChange = (name, date) => {
    setTask({ ...task, [name]: date });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      'name', 'email', 'phone', 'department', 'position',
      'country', 'state', 'city', 'taskName', 'assignedBy'
    ];

    requiredFields.forEach(field => {
      if (!task[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (task.email && !emailRegex.test(task.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    const phoneRegex = /^\d{10}$/;
    if (task.phone && !phoneRegex.test(task.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!task.startDate) newErrors.startDate = 'Start date is required';
    if (!task.deadline) newErrors.deadline = 'Deadline is required';
    else if (task.startDate && task.deadline < task.startDate) {
      newErrors.deadline = 'Deadline cannot be earlier than Start Date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskWithId = {
      ...task,
      id: task.id || Date.now().toString(),
    };

    onSubmit(taskWithId);
    console.log("Task submitted:", taskWithId);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">ToDoList</Typography>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: '100px', paddingBottom: '50px' }}>
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ borderRadius: 4, padding: { xs: 6, sm: 4 }, backgroundColor: (theme) => theme.palette.background.default }}>
            <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
              {taskToEdit ? 'Edit Task' : 'Add New Task'}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Employee Info</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {[
                  { label: "Name", name: "name" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "tel" },
                  { label: "Department", name: "department" },
                  { label: "Position", name: "position" }
                ].map(({ label, name, type = "text" }) => (
                  <Grid item xs={12} sm={6} key={name} sx={{minWidth: '245px'}}>
                    <TextField
                      fullWidth
                      required
                      type={type}
                      label={label}
                      name={name}
                      value={task[name]}
                      onChange={handleChange}
                      error={!!errors[name]}
                      helperText={errors[name]}
                      slotProps={name === "phone" ? { maxLength: 10 } : {}}
                    />
                  </Grid>
                ))}

                <Grid item xs={12} sm={6} sx={{minWidth: '245px'}}>
                  <TextField
                    select
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    value={task.country}
                    onChange={handleChange}
                    error={!!errors.country}
                    helperText={errors.country}
                  >
                    {Object.keys(locations).map((country) => (
                      <MenuItem key={country} value={country}>{country}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} sx={{minWidth: '245px'}}>
                  <TextField 
                    select
                    required
                    fullWidth
                    label="State"
                    name="state"
                    value={task.state}
                    onChange={handleChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    disabled={!task.country}
                  >
                    {task.country && Object.keys(locations[task.country]).map((state) => (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} sx={{minWidth: '245px'}}>
                  <TextField 
                    select
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={task.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    disabled={!task.state}
                  >
                    {task.country && task.state && locations[task.country][task.state].map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>Task Info</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{minWidth: '245px'}}>
                  <TextField
                    fullWidth
                    required
                    label="Task Name"
                    name="taskName"
                    value={task.taskName}
                    onChange={handleChange}
                    error={!!errors.taskName}
                    helperText={errors.taskName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{minWidth: '245px'}}>
                  <TextField
                    fullWidth
                    required
                    label="Assigned By"
                    name="assignedBy"
                    value={task.assignedBy}
                    onChange={handleChange}
                    error={!!errors.assignedBy}
                    helperText={errors.assignedBy}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={task.startDate}
                    onChange={(date) => handleDateChange("startDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Deadline"
                    value={task.deadline}
                    onChange={(date) => handleDateChange("deadline", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!errors.deadline,
                        helperText: errors.deadline
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{minWidth: '245px'}}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AssignmentIcon />}
                  size="large"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    },
                    width: { xs: '100%', sm: '60%', md: '40%' }
                  }}
                >
                  {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default TaskForm;