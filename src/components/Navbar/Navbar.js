import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="container">
      <a href="/" className="site-title">Mike's Airbnb</a>
      <ul>
        <li className="active">
          <a href="/signin">Sign In</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
