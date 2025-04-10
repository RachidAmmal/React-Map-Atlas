import React, { useState } from "react";
import "./NavBar.css";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { HiPuzzle } from "react-icons/hi";
import { IoHome } from "react-icons/io5";

const NavBar = () => {
  const path = useLocation();
  const pathIsMain = path.pathname === "/main";

  const [toggle, setToggle] = useState(false);

  return (
    <div className="nav-bar-container">
      <NavLink
        to="/"
        className={`${"app-header"} ${pathIsMain && "app-header-display"}`}
      >
        <span className="header-part-1">Map</span>
        <span className="header-part-2">Atlas</span>
      </NavLink>
      <div className="nav-sub-container">
        {pathIsMain && <SearchBar />}
      </div>
      <div onClick={() => setToggle(true)} className="barsMedia">
        <i className="fa-solid fa-bars" />
      </div>
      <div
        className={
          toggle
            ? "navLinksMedia transformationNon"
            : "navLinksMedia transformationMedia"
        }
      >
        <div onClick={() => setToggle(false)} className="xMard">
          <i className="fa-solid fa-x xMard" />
        </div>
        <NavLink
          onClick={() => setToggle(false)}
          to="/"
          className={({ isActive }) =>
            `${"nav-link-1"} ${isActive && "nav-link-active"}`}
        >
          <span>
            <IoHome className="link-icon" />
            Home
          </span>
        </NavLink>
        <NavLink
          onClick={() => setToggle(false)}
          to="/main"
          className={({ isActive }) =>
            `${"nav-link-1"} ${isActive && "nav-link-active"}`}
        >
          <span>
            <GiEarthAfricaEurope className="link-icon" />
            Main Page
          </span>
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            `${"nav-link-1"} ${isActive && "nav-link-active"}`}
        >
          <span>
            <HiPuzzle className="link-icon" />
            Quizzes
          </span>
        </NavLink>
        <NavLink
          onClick={() => setToggle(false)}
          to="/about"
          className={({ isActive }) =>
            `${"nav-link-1"} ${isActive && "nav-link-active"}`}
        >
          <span>
            <BsFillInfoCircleFill className="link-icon" />
            About
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
