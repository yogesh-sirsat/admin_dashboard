import PropTypes from "prop-types";
import EditIcon from "./svgs/EditIcon";
import DeleteIcon from "./svgs/DeleteIcon";

const ReadOnlyRow = ({ user, setEditUserId, handleDelete }) => {
  return (
    <>
      <td className="whitespace-nowrap">{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className="">
        <button
          className="edit rounded shadow-md border border-gray-300 p-1 mr-1 hover:bg-gray-200"
          onClick={() => {
            setEditUserId(user.id);
          }}
        >
          <EditIcon />
        </button>
        <button
          className="delete rounded shadow-md border border-gray-300 p-1 text-red-700 hover:bg-red-200"
          onClick={() => {
            handleDelete(user.id);
          }}
        >
          <DeleteIcon />    
        </button>
      </td>
    </>
  );
};

ReadOnlyRow.propTypes = {
  user: PropTypes.object.isRequired,
  setEditUserId: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ReadOnlyRow;
