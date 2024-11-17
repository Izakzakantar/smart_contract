import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Signup from '../sign_up/sign_Up';
function Header() {
  return (
    <header className="header">
      {/* drapeau gauche */}
      <img src="#" alt="Left Flag" className="flag-left-flag" />

      <div className="logo">
        <Link to="/">
        <img style={{width: '100%', height: '100%'}} src="" />
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
        <Link to="/signup" className='sign-up'>Sign up</Link>
      </div>
      
      {/* drapeau droit */}
      <img src="#" alt="Right Flag" className="flag-right-flag" />
    </header>
  );
}

export default Header;
