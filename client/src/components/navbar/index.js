import React from "react";
import "./Navbar.css";
import Logo from "./logo.png";

const Navbar = () => {
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
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
