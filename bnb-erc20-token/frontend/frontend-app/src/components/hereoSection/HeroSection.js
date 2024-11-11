import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>With QUDS, We reach the unreachable</h1>
        <p>Buy, Sell or Transfer your tokens with QUDS wallet, the platform dedicated to every crypto enthusiast at every level.</p>
        <Link to="/get-started" className="get-started-button">Get Started</Link>
      </div>
    </section>
  );
}

export default HeroSection;
