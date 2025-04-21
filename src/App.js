import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const Dashboard = lazy(() => import("./Components/Dashboard"));
const AddTask = lazy(() => import("./Pages/AddTask"));
const CompletedTasks = lazy(() => import("./Pages/CompletedTasks"));
const PendingTasks = lazy(() => import("./Pages/PendingTasks"));


function App() {
  return (
    <Router>
      <Suspense
       fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' , backgroundColor: '#f5f5f5' }}>
          <CircularProgress color="primary" />
          <Box sx={{ ml: 2, fontSize: '1.5rem', color: '#333' }}>
            Loading ...
          </Box>
        </Box>
       }
        >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/pending" element={<PendingTasks />} />
      </Routes>
      </Suspense>
    </Router> 
  );
}

export default App;