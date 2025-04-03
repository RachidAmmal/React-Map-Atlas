import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { fetchCountryInfo, showMySearch } from "../../readux/country-info";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";

const SearchBar = () => {
  const suggestions = COUNTRY_NAMES_LIST;

  const [countrySearch, setCountrySearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [displayingSugg, setDisplayingSugg] = useState(false);
  const dispatch = useDispatch();

  const handleChange = e => {
    const value = e.target.value.toLowerCase();
    setCountrySearch(value);

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
    setCountrySearch(
      Array.isArray(suggestion.common)
        ? suggestion.common[0]
        : suggestion.common
    );
    setFilteredSuggestions([]);
  };

  const handleSearchCountry = () => {
    dispatch(showMySearch({ searching: true }));
    dispatch(fetchCountryInfo(countrySearch));
    setCountrySearch("");
    setDisplayingSugg(true);
  };

  const searchSubmitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className="searchDiv">
      <form onSubmit={searchSubmitHandler}>
        <input
          value={countrySearch}
          onChange={handleChange}
          className="input-search"
          type="text"
          placeholder="Search a Country"
        />
        <button
          onClick={handleSearchCountry}
          disabled={countrySearch === ""}
          className="button-search"
          type="submit"
        >
          Search
        </button>

        <button
          className="button-search"
          type="submit"
        >
          Random
        </button>
      </form>
      {filteredSuggestions.length > 0 &&
        <ul className={`suggestions ${displayingSugg ? "displaySugg" : ""}`}>
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
    </div>
  );
};

export default SearchBar;
