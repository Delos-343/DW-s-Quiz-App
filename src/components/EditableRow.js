import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSave,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="soal"
          value={editFormData.soal}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="jawabanA"
          value={editFormData.jawabanA}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="jawabanB"
          value={editFormData.jawabanB}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an email..."
          name="jawabanC"
          value={editFormData.jawabanC}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an email..."
          name="jawabanD"
          value={editFormData.jawabanD}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
      <select class="custom-select" name="jawabanBenar" value={editFormData.kuncijawaban} onChange={handleEditFormChange}>
        <option value={editFormData.jawabanA}>{editFormData.jawabanA}</option>
        <option value={editFormData.jawabanB}>{editFormData.jawabanB}</option>
        <option value={editFormData.jawabanC}>{editFormData.jawabanC}</option>
        <option value={editFormData.jawabanD}>{editFormData.jawabanD}</option>
        </select>
      </td>
      <td>
        <button type="submit" onClick={handleEditFormSave}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;