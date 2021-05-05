import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const asideNavbar = useRef(null);
  const hamburger = useRef(null);

  const handleMenu = () => {
    if (menuOpen) {
      hamburger.current.classList.remove('open');
      asideNavbar.current.classList.remove("slide-animation");
      asideNavbar.current.classList.add("slide-animation-back");
      setTimeout(() => {
        setMenuOpen((prev) => !prev);
      }, 400)
    } else {
      hamburger.current.classList.add("open");
      setMenuOpen((prev) => !prev);
    }
  }

  const asideMenu = () => {
    return (
      <div
        className="navbar-aside-background"
        onClick={(e) => {
          if (e.target.classList.contains("navbar-aside-background")) {
            handleMenu();
          }
        }}
      >
        <aside className="navbar-aside slide-animation" ref={asideNavbar}>
          <span className="material-icons md-36" onClick={handleMenu}>
            arrow_back
          </span>
          <NavLink to="/" onClick={handleMenu}>
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleMenu}>
            Login
          </NavLink>
          <NavLink to="/signup" onClick={handleMenu}>
            Signup
          </NavLink>
        </aside>
      </div>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-left" ref={hamburger}>
        <span className="material-icons md-36" onClick={handleMenu}>
          menu
        </span>
      </div>
      {menuOpen && asideMenu()}
      <div className="navbar-center">
        <img src="./assets/logo.png" alt="Web Logo" />
      </div>

      <div className="navbar-right">
        <span className="material-icons md-36">account_circle</span>
        <span className="material-icons md-36">notifications</span>
      </div>
    </nav>
  );
};

export default Navbar;
