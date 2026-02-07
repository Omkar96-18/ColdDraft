import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home/>} />

      {/* Default Redirect: Send users to login if path is unknown */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      
    </Routes>
  );
};

export default AppRoutes;