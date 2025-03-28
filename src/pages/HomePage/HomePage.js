import React, { useEffect, useState } from "react";
import SliderHome from "./SliderHome";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showMyCountry } from "../../readux/map-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { fetchTheCenter } from "../../readux/centering-theMap-slice";

const HomePage = () => {
  const [country1, setCountry1] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };

  const dispatch = useDispatch();

  const handleMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        dispatch(showMyCountry({
            m: true,
            zoom: ZOOM_MAP,
            loc: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            clickedLocationMap: null
          }));
      });
    }

  };

  useEffect(
    () => {
      handleMyLocation();
    },
    []
  );

  return <div>
      <SliderHome className="slider" />
      <div className="moving">
        <form onSubmit={handleSubmit}>
          <input className="input" onChange={e => setCountry1(e.target.value)} type="text" placeholder="Search a Country " />
          <Link className="linkButton" to={country1 !== "" && "/main"}>
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
          <Link onClick={handleMyLocation} to="/main" className="link">
            <img className="icon" src="/images/icons/map.png" alt="" />
            <span>My Country</span>
          </Link>
          <Link to="/about" className="link">
            <img className="icon" src="/images/icons/information1.png" alt="" />
            <span>About</span>
          </Link>
        </div>
      </div>
    </div>;
};

export default HomePage;
