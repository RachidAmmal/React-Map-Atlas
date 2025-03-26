import React, { useState } from "react";
import SliderHome from "./SliderHome";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [country, setCountry] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <SliderHome className="slider" />
      <div className="moving">
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            onChange={e => setCountry(e.target.value)}
            type="text"
            placeholder="Search a Country "
          />
          <Link className="linkButton" to={country !== "" && "/main"}>
            <button className="button" type="submit">
              Search
            </button>
          </Link>
        </form>
        <div className="links">
          <Link to="/main" className="link">
            <img className="icon" src="/images/icons/navigation.png" alt="" />
            <span>Random Country</span>
          </Link>
          <Link to="/quiz" className="link">
            <img className="icon" src="/images/icons/quizzes.png" alt="" />
            <span>Quizzes</span>
          </Link>
          <Link to="/main" className="link">
            <img className="icon" src="/images/icons/map.png" alt="" />
            <span>My Country</span>
          </Link>
          <Link to="/about" className="link">
            <img className="icon" src="/images/icons/information1.png" alt="" />
            <span>About</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
