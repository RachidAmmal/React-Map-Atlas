import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const searchSubmitHandler = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={searchSubmitHandler}>
        <input
          className="input-search"
          type="text"
          placeholder="Search a Country"
        />
        <button className="button-search" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
