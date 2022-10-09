import "./FilterCheckbox.css";

const FilterCheckbox = ({ onChange, isShort }) => {
  return (
    <label className="filter">
      <input
        type="checkbox"
        id="checkbox"
        checked={isShort}
        onChange={onChange}
        className="filter__checkbox"
      />
      <span className="filter__slider"></span>
    </label>
  );
};

export default FilterCheckbox;
