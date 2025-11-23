import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          FIX Message Sender
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/messages" className="nav-link">
            Messages
          </Link>
          <Link to="/build" className="nav-link">
            Build FIX
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
