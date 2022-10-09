import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { searchErrorMovies } from "../../../utils/constans";

const SearchForm = ({ onSearch, searchLocal, shortLocal }) => {
  const [search, setSearch] = useState(searchLocal || "");
  const [error, setError] = React.useState("");
  const [isShort, setIsShort] = useState(shortLocal === "true" ? true : false);
  const [isValid, setValid] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    onSearch(search, isShort);
  };

  const handleInvalidForm = () => {
    if (!search) {
      setValid(false);
      setError(searchErrorMovies);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);

    setValid(true);

    if (e.target.value.length === 0) {
      setError(searchErrorMovies);
    } else {
      setError("");
    }
  };

  const handleCheckboxSwitch = () => {
    setIsShort(!isShort);

    console.log(!isShort);

    onSearch(search, !isShort);
  };

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
        <button
          className={`search__button ${
            !isValid ? "search__button_disabled" : ""
          }`}
          type="submit"
          disabled={!isValid}
        />
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
