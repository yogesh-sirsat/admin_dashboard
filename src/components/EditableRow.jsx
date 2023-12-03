import PropTypes from "prop-types";
import { useState } from "react";
import SaveIcon from "./svgs/SaveIcon";
import CancelIcon from "./svgs/CancelIcon";

const EditableRow = ({ user, handleEdit, setEditUserId }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleCancel = () => {
    setEditedUser(user);
    setEditUserId(null);
  };

  const handleSave = () => {
    handleEdit(editedUser);
    setEditUserId(null);
  }

  return (
    <>
      <td>
        <input
          type="text"
          size={1}
          value={editedUser.name}
          className="border rounded shadow-md border-gray-300 px-1 w-full"
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="email"
          size={1}
          value={editedUser.email}
          className="border rounded shadow-md border-gray-300 px-1 w-full"
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
        />
      </td>
      <td>
        <input
          type="text"
          size={1}
          value={editedUser.role}
          className="border rounded shadow-md border-gray-300 px-1 w-full"
          onChange={(e) =>
            setEditedUser({ ...editedUser, role: e.target.value })
          }
        />
      </td>
      <td>
        <button
          className="save rounded shadow-md border border-gray-300 p-1 mr-1 hover:bg-gray-200"
          onClick={handleSave}
        >
          <SaveIcon />
        </button>
        <button
          className="cancel rounded shadow-md border border-gray-300 p-1 text-red-700 hover:bg-red-200"
          onClick={handleCancel}
        >
          <CancelIcon />
        </button>
      </td>
    </>
  );
};

EditableRow.propTypes = {
  user: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  setEditUserId: PropTypes.func.isRequired,
};

export default EditableRow;
