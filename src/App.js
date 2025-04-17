import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Dashboard from "./Components/Dashboard";
import AddTask from "./Pages/AddTask";
import CompletedTasks from "./Pages/CompletedTasks";
import PendingTasks from "./Pages/PendingTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/pending" element={<PendingTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
