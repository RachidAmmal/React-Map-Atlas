import React, { useEffect, useState } from "react";
import SliderHome from "./SliderHome";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMyCountry } from "../../readux/map-slice";
import { ZOOM_MAP } from "../../constants/ZOOM_MAP";
import { fetchCountryInfo, showMySearch } from "../../readux/country-info";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";

const HomePage = () => {
  const suggestions = COUNTRY_NAMES_LIST;
  const [country1, setCountry1] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [displayingSugg, setDisplayingSugg] = useState(false);

  const [rand, setRand] = useState(0);

  const dispatch = useDispatch();

  const handleChange = e => {
    const value = e.target.value.toLowerCase();
    setCountry1(value);

    if (value) {
      const filtered = suggestions
        .filter(({ common, official }) => {
          const commonNames = Array.isArray(common) ? common : [common];
          return (
            commonNames.some(name => name.toLowerCase().includes(value)) ||
            official.toLowerCase().includes(value)
          );
        })
        .sort((a, b) => {
          const aCommon = Array.isArray(a.common)
            ? a.common[0].toLowerCase()
            : a.common.toLowerCase();
          const bCommon = Array.isArray(b.common)
            ? b.common[0].toLowerCase()
            : b.common.toLowerCase();

          if (aCommon.startsWith(value) && !bCommon.startsWith(value))
            return -1;
          if (!aCommon.startsWith(value) && bCommon.startsWith(value)) return 1;
          return aCommon.localeCompare(bCommon);
        })
        .slice(0, 10);

      setDisplayingSugg(false);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
      setDisplayingSugg(true);
    }
  };

  const handleSelect = suggestion => {
    setCountry1(
      Array.isArray(suggestion.common)
        ? suggestion.common[0]
        : suggestion.common
    );
    setFilteredSuggestions([]);
  };

  const handleMyLocation = () => {
    setRand(1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const hanleInfoCount = () => {
    dispatch(showMySearch({ searching: true }));
    dispatch(fetchCountryInfo(country1));
    setCountry1("");
  };

  useEffect(
    () => {
      if (rand === 1) handleMyLocation1();
    },
    [rand, dispatch, handleMyLocation1]
  );

  return (
    <div>
      <SliderHome className="slider" />
      <div className="moving">
        <form
          style={{ position: "relative" }}
          onSubmit={e => e.preventDefault()}
        >
          <input
            className="input"
            value={country1}
            onChange={handleChange}
            type="text"
            placeholder="Search a Country"
          />
          <Link className="linkButton" to={country1 !== "" ? "/main" : ""}>
            <button onClick={hanleInfoCount} className="button" type="submit">
              Search
            </button>
          </Link>
          {filteredSuggestions.length > 0 &&
            <ul
              className={`suggestionsH ${displayingSugg ? "displaySugg" : ""}`}
            >
              {filteredSuggestions.map((suggestion, index) =>
                <li
                  key={index}
                  onClick={() => handleSelect(suggestion)}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-gray-400"
                >
                  {Array.isArray(suggestion.common)
                    ? suggestion.common.join(" / ")
                    : suggestion.common}
                </li>
              )}
            </ul>}
        </form>
        <div className="homeLinks">
          <Link to="/main" className="homeLink">
            <img className="icon" src="/images/icons/homepage.png" alt="" />
            <span>Main Page</span>
          </Link>
          <Link to="/quiz" className="homeLink">
            <img className="icon" src="/images/icons/quizzes.png" alt="" />
            <span>Quizzes</span>
          </Link>
          <Link onClick={handleMyLocation} to="/main" className="homeLink">
            <img className="icon" src="/images/icons/map.png" alt="" />
            <span>My Country</span>
          </Link>
          <Link to="/about" className="homeLink">
            <img className="icon" src="/images/icons/information.png" alt="" />
            <span>About</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
