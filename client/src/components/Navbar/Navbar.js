import React, { useState } from 'react';
import './Navbar.css';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(null);

  const handleMenu = () => {
    setMenuOpen((prev) => !prev);
  }

  return (
    <nav className="navbar">
      <div className={`navbar-left${menuOpen ? " open" : ''}`} onClick={handleMenu}>
        <div className="hamburger"></div>
      </div>

      <div className="navbar-center">
        <img src="./assets/logo.png" alt="Web Logo" />
      </div>

      <div className="navbar-right">Right</div>
    </nav>
  );
};

export default Navbar;
