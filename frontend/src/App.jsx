import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;