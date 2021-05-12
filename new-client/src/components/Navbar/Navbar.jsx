import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { SideNavbar } from './SideNavbar';
import './Navbar.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideNavbar = useRef(null);
  const history = useHistory();

  const handleMenu = () => {
    if (isMenuOpen) {
      sideNavbar.current.classList.remove("slide-animation");
      sideNavbar.current.classList.add("slide-animation-back");
      setTimeout(() => {
        setIsMenuOpen(prev => !prev)
      }, 400);
    } else {
      setIsMenuOpen(prev => !prev);
    }
  }

  const homepageRedirect = () =>{
    history.push('/');
    window.scrollTo(0, 0);
  }

  return (
    <nav className="navbar">
      <div className="navbar--left">
        <span className="material-icons" onClick={handleMenu}>
          menu
        </span>
      </div>

      <div className="navbar--center">
          <img src="/assets/logo.png" alt="Our website logo" onClick={homepageRedirect} />
      </div>

      <div className="navbar--right">
        <span className="material-icons">search</span>
      </div>
      {isMenuOpen && <SideNavbar sideNavbar={sideNavbar} handleMenu={handleMenu} />}
    </nav>
  );
}
