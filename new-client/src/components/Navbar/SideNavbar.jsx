import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import Context from "../../Context";
export const SideNavbar = ({ sideNavbar, handleMenu }) => {
  const { user } = useContext(Context);

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("navbar--side-bg")) {
      handleMenu();
    }
  };

  return (
    <div className="navbar--side-bg" onClick={handleBackgroundClick}>
      <div className="navbar--side slide-animation" ref={sideNavbar}>
        <span className="material-icons back" onClick={handleMenu}>
          arrow_back
        </span>
        <NavLink to="/" onClick={handleMenu}>
          Home
        </NavLink>

        {/* If user not connected */}
        {!user.get && (
          <NavLink to="/login" onClick={handleMenu}>
            Login
          </NavLink>
        )}
        
        {/* If user connected */}
        {user.get && (
          <>
            <NavLink to="/add-recipe" onClick={handleMenu}>
              Add Recipe
            </NavLink>
            <NavLink to="/logout" onClick={handleMenu}>
              Logout
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
