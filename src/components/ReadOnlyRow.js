import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
     
    <tr>
      <td>{contact.soal}</td>
      <td>{contact.jawabanA}</td>
      <td>{contact.jawabanB}</td>
      <td>{contact.jawabanC}</td>
      <td>{contact.jawabanD}</td>
      <td>{contact.kuncijawaban}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
