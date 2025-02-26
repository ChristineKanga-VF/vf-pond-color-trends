import React from "react";
import "./App.css";
import ColorPicker from "./pages/ColorPicker";
import { Report } from "./pages/Report";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./auth/Signin";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/color-picker" element={<ProtectedRoute element={<ColorPicker />} />} />
          <Route path="/report" element={<ProtectedRoute element={<Report />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
