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
          <span className="material-icons yellow">home</span>
          Home
        </NavLink>
        <NavLink to="/recipes" onClick={handleMenu}>
          <span className="material-icons purple">restaurant_menu</span>
          Recipes
        </NavLink>

        {/* If user not connected */}
        {!user.get && (
          <NavLink to="/login" onClick={handleMenu}>
            <span className="material-icons green">login</span>
            Login
          </NavLink>
        )}
        {/* If user connected */}
        {user.get && (
          <>
            <NavLink to={`/profile/${user.get.user.username}`} onClick={handleMenu}>
              <span className="material-icons pink">account_circle</span>
              Profile
            </NavLink>
            <NavLink to="/add-recipe" onClick={handleMenu}>
              <span className="material-icons blue">post_add</span>
              Add Recipe
            </NavLink>
            <NavLink to="/logout" onClick={handleMenu}>
              <span className="material-icons red">logout</span>
              Logout
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
