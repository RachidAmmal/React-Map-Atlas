import React, { useState } from "react";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { fetchCountryInfo } from "../../readux/country-info";

const SearchBar = () => {
  const [countrySearch, setCountrySearch] = useState("");

  const dispatch = useDispatch()

  const handleSearchCountry = () => {
    dispatch(fetchCountryInfo(countrySearch))
    setCountrySearch("")
  }

  const searchSubmitHandler = e => {
    e.preventDefault();
  };

  return <div>
      <form onSubmit={searchSubmitHandler}>
        <input value={countrySearch} onChange={e => setCountrySearch(e.target.value)} className="input-search" type="text" placeholder="Search a Country" />
        <button onClick={handleSearchCountry} disabled={countrySearch === "" ? true : false} className="button-search" type="submit">
          Search
        </button>
      </form>
    </div>;
};

export default SearchBar;
