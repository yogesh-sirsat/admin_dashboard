// src/components/Pagination.js
import PropTypes from "prop-types";
import FirstPageIcon from "./svgs/FirstPageIcon";
import PreviousPageIcon from "./svgs/PreviousPageIcon";
import NextPageIcon from "./svgs/NextPageIcon";
import LastPageIcon from "./svgs/LastPageIcon";

const Pagination = ({ totalPages, currentPage, navigateToPage }) => {
  return (
    <section className="rounded-lg shadow-lg max-w-full w-fit overflow-x-auto [&_:focus-visible]:ring-inset">
      <div className="mt-4 flex flex-row border border-gray-100">
        <button onClick={() => navigateToPage(1)} className="first-page rounded-l-lg p-1 border-r">
          <FirstPageIcon />
        </button>
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          className="previous-page p-1 border-r"
        >
          <PreviousPageIcon />
        </button>
        <div className="flex flex-row overflow-x-auto">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToPage(index + 1)}
              className={
                ("page-number-"+(index + 1)) + " px-2 border-r font-semibold " + (index + 1 === currentPage ? "bg-gray-100" : "")
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          className="next-page p-1 border-r"
        >
          <NextPageIcon />
        </button>
        <button onClick={() => navigateToPage(totalPages)} className="last-page p-1 rounded-r-lg">
          <LastPageIcon />
        </button>
      </div>
    </section>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  navigateToPage: PropTypes.func.isRequired,
};

export default Pagination;
