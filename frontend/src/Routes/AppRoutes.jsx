
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/registration/Login";
import Register from "../pages/registration/Register";
import Home from "../pages/main/Home";

function AppRoutes ()  {
  return (
    <Routes>
 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home/>} />

      <Route path="*" element={<Navigate to="/login" replace />} />

      
    </Routes>
  );
};

export default AppRoutes;