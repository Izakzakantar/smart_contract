import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HeroSection from "./components/hereoSection/HeroSection";
import Signup from "./components/sign_up/sign_Up";
import Dashboard from "./components/dashboard/dashBoard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        
        
       
        <Routes>
          <Route path="/" element={<HeroSection />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
