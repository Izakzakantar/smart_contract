import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/Header';
import HeroSection from './components/hereoSection/HeroSection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <HeroSection/>
      </div>
    </Router>
  );
}

export default App;
