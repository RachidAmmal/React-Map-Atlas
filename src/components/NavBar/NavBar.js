import React from "react";
import "./NavBar.css";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { HiPuzzle } from "react-icons/hi";

const NavBar = () => {
  const path = useLocation();
  const pathIsHome = path.pathname === "/";

  return <div className="nav-bar-container">
      <NavLink to="/" className={`${"app-header"} ${pathIsHome && "app-header-is-home"}`}>
        <span className="header-part-1">Map</span>
        <span className="header-part-2">Atlas</span>
      </NavLink>
      <div className="nav-sub-container">
        <SearchBar />
      </div>
      <div>
        <NavLink to="/" className={({ isActive }) => `${"nav-link-1"} ${isActive && "nav-link-active"}`}>
          <span>
            <GiEarthAfricaEurope className="link-icon" />
            Home
          </span>
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => `${"nav-link-1"} ${isActive && "nav-link-active"}`}>
          <span>
            <HiPuzzle className="link-icon" />
            Quizzes
          </span>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `${"nav-link-1"} ${isActive && "nav-link-active"}`}>
          <span>
            <BsFillInfoCircleFill className="link-icon" />
            About
          </span>
        </NavLink>
      </div>
    </div>;
};

export default NavBar;
