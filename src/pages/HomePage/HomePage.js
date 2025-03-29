import React, { useEffect, useState } from "react";
import SliderHome from "./SliderHome";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showMyCountry } from "../../readux/map-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { fetchTheRandom } from "../../readux/random-country";

const HomePage = () => {
  const [country1, setCountry1] = useState("");

  const { random } = useSelector((state) => state.random);

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

  const handleMyLocationRand = () => {
  setRand(2);
};

const handleMyLocationRand2 = () => {
  dispatch(fetchTheRandom());
};


useEffect(
  () => {
    if (rand === 1) handleMyLocation1();
    if (rand === 2) handleMyLocationRand2();
  },
  [rand]
);

  return <div>
      <SliderHome className="slider" />
      <div className="moving">
        <form onSubmit={e => e.preventDefault()}>
          <input className="input" onChange={e => setCountry1(e.target.value)} type="text" placeholder="Search a Country" />
          <Link className="linkButton" to={country1 !== "" ? "/main" : "#"}>
            <button className="button" type="submit">
              Search
            </button>
          </Link>
        </form>
        <div className="links">
          <Link onClick={handleMyLocationRand} to="/main" className="link">
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
