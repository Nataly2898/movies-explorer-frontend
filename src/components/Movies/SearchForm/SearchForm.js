import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <div className="search">
      <form className="search__form">
        <input
          type="text"
          placeholder="Фильм"
          className="search__name"
          required
        />
        <button className="search__button"></button>
      </form>
      <div className="search__filter">
        <FilterCheckbox />
        <span className="search__filter-text">Короткометражки</span>
      </div>
    </div>
  );
};

export default SearchForm;
