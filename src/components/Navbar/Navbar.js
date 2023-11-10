import React, { useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../pictures/logo.png";

function Navbar() {
  const navigate = useNavigate();
  let username = sessionStorage.getItem("username");
  useEffect(() => {}, []);

  const signout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="container sticky">
      <div className="container">
        <img src={logo} alt="logo" className="picture-logo" />
        <a href="/" className="site-title">
          Mike's Airbnb
        </a>
      </div>
      <ul>
        <li className="active">
          <a href="/favorite">My Favorites</a>
        </li>
        <li className="active">
          {username == null ? (
            <a href="/signin">Sign In</a>
          ) : (
            <a href="/signin" onClick={signout}>
              Sign Out
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
