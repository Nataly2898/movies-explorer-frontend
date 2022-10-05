import React, { useCallback, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { ReactComponent as SearchIcon } from "../../../images/icon-search.svg";
import { searchErrorMovies } from "../../../utils/constans";

const SearchForm = ({ onSearch, cacheValue }) => {
  const [search, setSearch] = useState(cacheValue);
  const [error, setError] = React.useState("");
  const [isShort, setIsShort] = useState(
    localStorage.getItem("isShort") === "true" ? true : false
  );
  const [isValid, setValid] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    onSearch(search, isShort);
    setSearch("");
  };

  const handleInvalidForm = () => {
    setValid(false);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      setError(searchErrorMovies);
    } else {
      setError("");
    }
  };

  const handleCheckboxSwitch = useCallback(() => {
    setIsShort(!isShort);

    localStorage.setItem("isShort", !isShort);
  }, [isShort]);

  React.useEffect(() => {
    if (search && !error) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [search, error]);

  return (
    <section className="search">
      <form
        className="search__form"
        onInvalid={handleInvalidForm}
        onSubmit={handleSearch}
      >
        <input
          value={search || ""}
          onChange={handleInputChange}
          className="search__name"
          type="text"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search__button" disabled={!isValid}>
          <SearchIcon />
        </button>
      </form>
      <span className="form__item-error">{error}</span>
      <div className="search__filter">
        <FilterCheckbox onChange={handleCheckboxSwitch} isShort={isShort} />
        <span className="search__filter-text">Короткометражки</span>
      </div>
    </section>
  );
};

export default SearchForm;
