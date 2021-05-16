import axios from 'axios';
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Context from "../../Context";
export const SideNavbar = ({ sideNavbar, handleMenu }) => {
  const { user, alertPopup } = useContext(Context);

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("navbar--side-bg")) {
      handleMenu();
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout",{},{headers: {"Authorization": `Bearer ${user.get.token}`}});
      user.set(null);
      alertPopup("Logged out!", "User logged out!", "green", 3000);
    } catch (error) {
      
    }
  }

  return (
    <div className="navbar--side-bg" onClick={handleBackgroundClick}>
      <div className="navbar--side slide-animation" ref={sideNavbar}>
        <span className="material-icons back" onClick={handleMenu}>
          arrow_back
        </span>
        <NavLink exact to="/" activeClassName="active yellow" onClick={handleMenu}>
          <span className="material-icons yellow">home</span>
          Home
        </NavLink>
        <NavLink
          exact
          to="/recipes"
          activeClassName="active purple"
          onClick={handleMenu}
        >
          <span className="material-icons purple">restaurant_menu</span>
          Recipes
        </NavLink>

        {/* If user not connected */}
        {!user.get && (
          <NavLink
            exact
            to="/login"
            activeClassName="active green"
            onClick={handleMenu}
          >
            <span className="material-icons green">login</span>
            Login
          </NavLink>
        )}
        {/* If user connected */}
        {user.get && (
          <>
            <NavLink
              exact
              to={`/profile/${user.get.user.username}`}
              activeClassName="active pink"
              onClick={handleMenu}
            >
              <span className="material-icons pink">account_circle</span>
              Profile
            </NavLink>
            <NavLink
              exact
              to="/add-recipe"
              activeClassName="active blue"
              onClick={handleMenu}
            >
              <span className="material-icons blue">post_add</span>
              Add Recipe
            </NavLink>
            <Link
              to="/"
              onClick={() => {
                handleLogout();
                handleMenu();
              }}
            >
              <span className="material-icons red">logout</span>
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
