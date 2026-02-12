import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";

import ProtectedRoute from "./ProtectedRoute";
import CreateCampaign from "../Pages/CreateCampaign";
import CampaignDetail from "../Pages/CampaignDetail";
import ProspectDetail from "../Pages/ProspectDetail"; // Ensure this import is correct
import WritePage from "../Pages/WritePage";
=======
import Login from "../pages/registration/Login";
import Register from "../pages/registration/Register";
import Home from "../pages/main/Home";
import ProtectedRoute from "./ProtectedRoute";
import CreateCampaign from "../pages/campaigns/CreateCampaign";
import CampaignDetail from "../pages/campaigns/CampaignDetail";
import ProspectDetail from "../pages/prospects/ProspectDetail";
>>>>>>> 6415ffbef0ee404f129ff4a9eda7b660d49589a0

function AppRoutes ()  {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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

      <Route
        path="/prospects/:id"
        element={
          <ProtectedRoute>
            <ProspectDetail />
          </ProtectedRoute>
        }
      />

      <Route path="/prospects/:id/write" element={<ProtectedRoute><WritePage /></ProtectedRoute>} />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;