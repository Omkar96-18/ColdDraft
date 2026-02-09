<<<<<<< HEAD
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import CreateCampaign from "../Pages/CreateCampaign";
import CampaignDetail from "../Pages/CampaignDetail";
import ProspectDetail from "../Pages/ProspectDetail"; // Ensure this import is correct
=======
>>>>>>> origin/main

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/registration/Login";
import Register from "../pages/registration/Register";
import Home from "../pages/main/Home";

function AppRoutes ()  {
  return (
    <Routes>
<<<<<<< HEAD
      {/* Public Routes */}
=======
 
>>>>>>> origin/main
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

<<<<<<< HEAD
      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaigns/new"
        element={
          <ProtectedRoute>
            <CreateCampaign />
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaigns/:id"
        element={
          <ProtectedRoute>
            <CampaignDetail />
          </ProtectedRoute>
        }
      />

      {/* --- NEW ROUTE ADDED HERE --- */}
      <Route
        path="/prospects/:id"
        element={
          <ProtectedRoute>
            <ProspectDetail />
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
=======
>>>>>>> origin/main
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;