import React, { useState, useEffect } from "react";
import { Box, CssBaseline, AppBar as MuiAppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem,
         ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Card, CardContent, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main")(() => ({
  flexGrow: 1,
  padding: "24px",
}));

const AppBar = styled(MuiAppBar)(() => ({
  zIndex: 1301,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function CompletedTasks() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filtered = allTasks.filter(
      (task) => task.status.toLowerCase() === "completed"
    );
    setCompletedTasks(filtered.map((task, index) => ({ id: index + 1, ...task })));
  }, []);

  const drawerItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Completed Tasks", path: "/completed" },
    { text: "Pending Tasks", path: "/pending" },
  ];

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "taskName", headerName: "Task", flex: 1 },
    { field: "assignedBy", headerName: "Assigned By", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "deadline", headerName: "Deadline", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 ,
      renderCell: (params) => (
        <span
          style={{
            color: "green" , fontWeight: "bold",
          }}
        >
          {params.value}
        </span>
      ),
     },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Completed Tasks
          </Typography>
          {user && <Typography>{user.email}</Typography>}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader/>
        <Divider />
        <List>
          {drawerItems.map(({ text, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(path);
                  handleDrawerClose();
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main>
        <DrawerHeader />
        <Box sx={{ width: "100%" }}>
          {isMobile ? (
            <Grid container spacing={2} sx={{ p: 2 }}>
              {completedTasks.map((task) => (
                <Grid item xs={12} sm={6} key={task.id}>
                  <Card variant="outlined">
                  <CardContent>
                  <Typography>
                    <strong>Name:</strong> {task.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {task.email}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {task.phone}
                  </Typography>
                  <Typography>
                    <strong>Department:</strong> {task.department}
                  </Typography>
                  <Typography>
                    <strong>Position:</strong> {task.position}
                  </Typography>
                  <Typography>
                    <strong>Country:</strong> {task.country}
                  </Typography>
                  <Typography>
                    <strong>State:</strong> {task.state}
                  </Typography>
                  <Typography>
                    <strong>City:</strong> {task.city}
                  </Typography>
                  <Typography>
                    <strong>Task:</strong> {task.taskName}
                  </Typography>
                  <Typography>
                    <strong>Assigned By:</strong> {task.assignedBy}
                  </Typography>
                  <Typography>
                    <strong>Start Date:</strong> {task.startDate}
                  </Typography>
                  <Typography>
                    <strong>Deadline:</strong> {task.deadline}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: "green" , fontWeight: "bold"}}>{task.status}</span>
                  </Typography>
                  </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <DataGrid
              rows={completedTasks}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              autoHeight
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
              },
              }}
            />
          )}
        </Box>
      </Main>
    </Box>
  );
}

export default CompletedTasks;