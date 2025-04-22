import React, { useContext, useState } from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskTable from "./TaskTable";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeModeContext } from "../Context/ThemeContext";


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

function Dashboard() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const {mode , toggleTheme} = useContext(ThemeModeContext);
  const [filterField, setFilterField] = useState(""); 
  const [filterValue, setFilterValue] = useState(""); 


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const drawerItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Completed Tasks", path: "/completed" },
    { text: "Pending Tasks", path: "/pending" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {user && (
            <Typography sx={{ flexGrow: 0, marginLeft: 2 }}>
              {user.email}
            </Typography>
          )}
          <IconButton
            color="inherit"
            aria-label="toggle theme"
            title="Toggle Theme"
            edge="end"
            onClick={toggleTheme}>
            { mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary" 
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
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
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
       <select
        value={filterField}
        onChange={(e) => {
        setFilterField(e.target.value);
        setFilterValue("");
        }}
       style={{  paddingTop: '10px', paddingBottom: '10px', border: '3px solid #ccc', borderRadius: '4px'}}
     >
     <option value="">Filter by...</option>
     <option value="name">Name</option>
     <option value="email">Email</option>
     <option value="phone">Phone</option>
     <option value="department">Department</option>
     <option value="position">Position</option>
     <option value="taskName">Task Name</option>
     <option value="assignedBy">Assigned By</option>
     <option value="country">Country</option>
     <option value="state">State</option>
     <option value="city">City</option>
     </select>

        {filterField && (
        <input
        type="text"
        placeholder={`Enter ${filterField}`}
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        style={{ padding: '10px',  width: '200px',  border: '3px solid #ccc',  borderRadius: '4px' }}
         />
         )}
        </Box>
        <TaskTable filterField={filterField} filterValue={filterValue} />
        <Fab
          variant="extended" color="primary" size="large"
          onClick={() => navigate("/add")}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          aria-label="add"
          title="Add Task"
        >
          <AddIcon />
          Add Task
        </Fab>
      </Main>
    </Box>
  );
}

export default Dashboard;