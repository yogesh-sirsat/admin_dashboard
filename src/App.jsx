import { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import SearchForm from "./components/SearchForm";
import DeleteIcon from "./components/svgs/DeleteIcon";
import { ITEMS_PER_PAGE } from "./utils/constants";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleUsersDataUpdate = (data, isOnSearchUpdate = false) => {
    if (!isOnSearchUpdate) {
      setUsers(data);
    }
    setFilteredUsers(data);
    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        handleUsersDataUpdate(data);
      } catch (error) {
        alert("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPageUsers(
      filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    );
  }, [filteredUsers, currentPage]);

  const handleRowCheckbox = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const selectAllCurrentPage = () => {
    setSelectedRows((prevSelectedRows) => {
      const toBeSelectedIds = currentPageUsers.map((user) => user.id);
      return [...new Set([...prevSelectedRows, ...toBeSelectedIds])];
    });
  };

  const deselectAllCurrentPage = () => {
    setSelectedRows((prevSelectedRows) => {
      const updatedRows = prevSelectedRows.filter((selectedId) => {
        return !currentPageUsers.some((user) => user.id === selectedId);
      });
      return updatedRows;
    });
  };

  const handleEdit = (editedUser) => {
    const updatedUsers = users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    });
    handleUsersDataUpdate(updatedUsers);
  };

  const handleDelete = (deletedUserId) => {
    const updatedUsers = users.filter((user) => user.id !== deletedUserId);
    handleUsersDataUpdate(updatedUsers);
  };

  const deleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    handleUsersDataUpdate(updatedUsers);
    setSelectedRows([]);
  };

  const manageSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value.toLowerCase();
    const fileteredUsersData = users.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchQuery)
      )
    );
    handleUsersDataUpdate(fileteredUsersData, true);
  };

  const navigateToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <main className="container mx-auto mt-8 px-2 xs:px-0">
      <section className="flex justify-between">
        <SearchForm manageSearch={manageSearch} />
        <button
          disabled={selectedRows.length === 0}
          className="delete-selected font-semibold rounded py-1 px-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white shadow-lg flex items-center gap-1 whitespace-nowrap"
          onClick={deleteSelected}
        >
          <DeleteIcon />
          <span className="hidden xs:block">Delete Selected</span>
        </button>
      </section>
      <UserTable
        users={currentPageUsers}
        selectedRows={selectedRows}
        handleRowCheckbox={handleRowCheckbox}
        selectAllCurrentPage={selectAllCurrentPage}
        deselectAllCurrentPage={deselectAllCurrentPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        navigateToPage={navigateToPage}
      />
    </main>
  );
}

export default App;
