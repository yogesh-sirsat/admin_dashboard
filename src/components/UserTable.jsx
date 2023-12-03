import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

const UserTable = ({
  users,
  selectedRows,
  handleRowCheckbox,
  selectAllCurrentPage,
  deselectAllCurrentPage,
  handleEdit,
  handleDelete,
}) => {
  const [editUserId, setEditUserId] = useState(null);
  const [isCurrentPageChecked, setIsCurrentPageChecked] = useState(false);

  useEffect(() => {
    setIsCurrentPageChecked(() => {
      if (users.length === 0) {
        return false;
      }
      let checked = true;
      users.forEach((user) => {
        if (!selectedRows.includes(user.id)) {
          checked = false;
          return;
        }
      });
      return checked;
    });
  }, [users, selectedRows]);

  return (
    <section className="rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full mt-4 text-left border border-gray-100">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 max-w-fit">
              <input
                type="checkbox"
                className="w-4 h-4 shadow-md"
                checked={isCurrentPageChecked}
                onChange={(e) => {
                  e.target.checked
                    ? selectAllCurrentPage()
                    : deselectAllCurrentPage();
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={
                "border-b border-gray-100 hover:bg-gray-100 " +
                (selectedRows.includes(user.id) ? "bg-gray-100" : "")
              }
            >
              <td className="p-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 shadow-md"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowCheckbox(user.id)}
                />
              </td>
              {user.id === editUserId ? (
                <EditableRow
                  user={user}
                  setEditUserId={setEditUserId}
                  handleEdit={handleEdit}
                />
              ) : (
                <ReadOnlyRow
                  user={user}
                  setEditUserId={setEditUserId}
                  handleDelete={handleDelete}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired,
  handleRowCheckbox: PropTypes.func.isRequired,
  selectAllCurrentPage: PropTypes.func.isRequired,
  deselectAllCurrentPage: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UserTable;
