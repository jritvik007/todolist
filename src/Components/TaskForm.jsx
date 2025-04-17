import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Box, Container, Paper,
  Button, TextField, MenuItem, Grid, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function TaskForm({ onSubmit, taskToEdit }) {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '', email: '', phone: '', department: '',
    position: '', taskName: '', assignedBy: '',
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
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setTask({ ...task, [name]: digitsOnly });
      }
    } else {
      setTask({ ...task, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleDateChange = (name, date) => {
    setTask({ ...task, [name]: date });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = ["name", "email", "phone", "department", "position", "taskName", "assignedBy"];

    requiredFields.forEach(field => {
      if (!task[field].trim()) {
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
          <Typography variant="h6" component="div">
            ToDo-List
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: '90px', paddingBottom: '50px' }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              {taskToEdit ? 'Edit Task' : 'Add New Task'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <TextField required label="Name" name="name" fullWidth value={task.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Email" name="email" type="email" fullWidth value={task.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Phone" name="phone" type="tel" inputProps={{ maxLength: 10 }} fullWidth value={task.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Department" name="department" fullWidth value={task.department} onChange={handleChange} error={!!errors.department} helperText={errors.department} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Position" name="position" fullWidth value={task.position} onChange={handleChange} error={!!errors.position} helperText={errors.position} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Task" name="taskName" fullWidth value={task.taskName} onChange={handleChange} error={!!errors.taskName} helperText={errors.taskName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required label="Assigned By" name="assignedBy" fullWidth value={task.assignedBy} onChange={handleChange} error={!!errors.assignedBy} helperText={errors.assignedBy} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={task.startDate}
                    onChange={(date) => handleDateChange("startDate", date)}
                    renderInput={(params) => <TextField {...params} required fullWidth error={!!errors.startDate} helperText={errors.startDate} />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Deadline"
                    value={task.deadline}
                    onChange={(date) => handleDateChange("deadline", date)}
                    renderInput={(params) => <TextField {...params} required fullWidth error={!!errors.deadline} helperText={errors.deadline} />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select label="Status" name="status" fullWidth value={task.status} onChange={handleChange}>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#1565c0'
                        },
                        mt: 3,
                        marginLeft: '180px'
                      }}
                    >
                      {taskToEdit ? 'Update Task' : 'Add Task'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default TaskForm;