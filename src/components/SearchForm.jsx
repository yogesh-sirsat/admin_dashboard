import PropTypes from "prop-types";
import SearchIcon from "./svgs/SearchIcon";

const SearchForm = ({ manageSearch }) => {
  return (
    <form onSubmit={manageSearch} className="flex gap-2 items-center rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        className="rounded shadow-md p-1 border border-gray-300 sm:w-52"
      />
      <button
        type="submit"
        className="search-icon rounded shadow-lg p-1 bg-blue-500 text-white"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  manageSearch: PropTypes.func.isRequired,
};

export default SearchForm;
