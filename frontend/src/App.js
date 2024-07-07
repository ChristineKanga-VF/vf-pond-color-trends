import React from "react";
import "./App.css";
import ColorPicker from "./pages/ColorPicker";
import { Report } from "./pages/Report";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ColorPicker />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
