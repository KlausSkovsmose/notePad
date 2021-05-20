import React from "react";
import "./Navbar.css";
import Logo from "./logo.png";
import { useUser } from "../../context/user.context";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { userData, setUserData } = useUser();

  const handleSignout = () => {
    localStorage.clear();
    setUserData(null);
  };
  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={Logo} alt="" />
        <div className="logo-divider"></div>
        <div className="logo-name">
          Note <br /> Pad
        </div>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeStyle={{ color: "black", textDecoration: "underline" }}
            >
              Home
            </NavLink>
          </li>
          <li>About</li>
          <li>Contact</li>
          {userData && (
            <li>
              <NavLink
                exact
                to="/dashboard"
                activeStyle={{ color: "black", textDecoration: "underline" }}
              >
                Hello <span>{userData.username}</span>! {"  "}
              </NavLink>
            </li>
          )}
        </ul>
        {!userData && <button className="login-btn">Login</button>}
        {userData && (
          <button className="signout-btn" onClick={handleSignout}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
