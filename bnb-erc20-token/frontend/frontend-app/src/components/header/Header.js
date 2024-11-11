import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      {/* drapeau gauche */}
      <img src="#" alt="Left Flag" className="flag-left-flag" />

      <div className="logo">
        <Link to="/">
          <img src="/path-to-logo.png" alt="Logo" />
        </Link>
      </div>
      
      <nav className="nav-links">
        <Link to="/buy-sell">Buy/Sell</Link>
        <Link to="/grow">Grow</Link>
        <Link to="/markets">Markets</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/support">Support</Link>
      </nav>
      
      <div className="auth-buttons">
        <Link to="/sign-in" className="sign-in">Sign In</Link>
        <Link to="/sign-up" className='sign-up'>Sign Up</Link>
      </div>
      
      {/* drapeau droit */}
      <img src="#" alt="Right Flag" className="flag-right-flag" />
    </header>
  );
}

export default Header;
