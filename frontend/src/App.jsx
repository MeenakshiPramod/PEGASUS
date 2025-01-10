import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import Navbar from "../components/navbar/Navbar"; // Import Navbar component
import './App.css';
function App() {
  return (
    <Router> {/* Wrap the application in Router */}
      <Navbar />
      <Routes>
        <Route path="/home" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/" element={<div>Landing Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
