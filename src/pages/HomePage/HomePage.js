import React, { useEffect, useState } from "react";
import SliderHome from "./SliderHome";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMyCountry } from "../../readux/map-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { fetchCountryInfo } from "../../readux/country-info";

const HomePage = () => {
  const [country1, setCountry1] = useState("");

  const [rand, setRand] = useState(0);

  const dispatch = useDispatch();

  const handleMyLocation = () => {
    setRand(1);
  };

  const handleMyLocation1 = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        dispatch(
          showMyCountry({
            m: true,
            zoom: ZOOM_MAP,
            loc: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            clickedLocationMap: null
          })
        );
      });
    }
  };

  const hanleInfoCount = country1 => {
    dispatch(fetchCountryInfo(country1));
  };

  useEffect(
    () => {
      if (rand === 1) handleMyLocation1();
    },
    [rand]
  );

  return <div>
      <SliderHome className="slider" />
      <div className="moving">
        <form onSubmit={e => e.preventDefault()}>
          <input className="input" value={country1} onChange={e => setCountry1(e.target.value)} type="text" placeholder="Search a Country" />
          <Link className="linkButton" to={country1 !== "" ? "/main" : ""}>
            <button onClick={() => hanleInfoCount(country1)} className="button" type="submit">
              Search
            </button>
          </Link>
        </form>
        <div className="links">
          <Link to="/main" className="link">
            <img className="icon" src="/images/icons/homepage.png" alt="" />
            <span>Main Page</span>
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
