import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import { Link } from "react-router-dom";
import "./halamanguru.scss";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import gql from "graphql-tag";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

const HalamanGuru = () => {
  const {
    data: tampilData,
    loading: tampilLoading,
    error: errorData,
  } = useQuery(TAMPIL_SEMUA_SOAL_JAWABAN);
  const [contacts, setContacts] = useState(tampilData);
  const [addFormData, setAddFormData] = useState({
    soal: "",
    jawabanA: "",
    jawabanB: "",
    jawabanC: "",
    jawabanD: "",
    jawabanBenar: "",
  });
  console.log(addFormData);
  const [tambahSoal, { data, loading, error }] = useMutation(TAMBAH_SOAL, {
    refetchQueries: [{ query: TAMPIL_SEMUA_SOAL_JAWABAN }],
  });

  const [
    deleteSoal,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_SOAL, {
    refetchQueries: [{ query: TAMPIL_SEMUA_SOAL_JAWABAN }],
  });

  const [editSoal]  = useMutation(UPDATE_SOAL, {
    refetchQueries: [{ query: TAMPIL_SEMUA_SOAL_JAWABAN }],
  })
  // console.log("Tampil Data",tampilData);

  const [editFormData, setEditFormData] = useState({
    soal: "",
    jawabanA: "",
    jawabanB: "",
    jawabanC: "",
    jawabanD: "",
    jawabanBenar: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    //event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSave = (id) => {
  

    editSoal({
      variables: {
            id : id,
            jawabanA: editFormData.jawabanA,
            jawabanB: editFormData.jawabanB,
            jawabanC: editFormData.jawabanC,
            jawabanD: editFormData.jawabanD,
            soal: editFormData.soal,
            kuncijawaban: editFormData.jawabanBenar,
      },
    });

    //mengubah state
    setEditContactId(0)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      soal: addFormData.soal,
      jawabanA: addFormData.jawabanA,
      jawabanB: addFormData.jawabanB,
      jawabanC: addFormData.jawabanC,
      jawabanD: addFormData.jawabanD,
      jawabanBenar: addFormData.jawabanBenar,
    };

    //const newContacts = [...contacts, newContact];
    //setContacts(newContacts);
    console.log("handleAddFormSubmit");
    tambahSoal({
      variables: {
            jawabanA: addFormData.jawabanA,
            jawabanB: addFormData.jawabanB,
            jawabanC: addFormData.jawabanC,
            jawabanD: addFormData.jawabanD,
            soal: addFormData.soal,
            kuncijawaban: addFormData.jawabanBenar,
      },
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      soal: editFormData.soal,
      jawabanA: editFormData.jawabanA,
      jawabanB: editFormData.jawabanB,
      jawabanC: editFormData.jawabanC,
      jawabanD: editFormData.jawabanD,
      jawabanBenar: editFormData.jawabanBenar,
    };
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      soal: contact.soal,
      jawabanA: contact.jawabanA,
      jawabanB: contact.jawabanB,
      jawabanC: contact.jawabanC,
      jawabanD: contact.jawabanD,
      jawabanBenar: contact.jawabanBenar,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
  
    deleteSoal({
      variables: { id: contactId },
    });
  };

  return (
    <div className="app-container">
      <div class="header"></div>
      <h1>Menu Pengaturan Soal dan Jawaban</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>soal</th>
              <th>Jawaban A</th>
              <th>Jawaban B</th>
              <th>Jawaban C</th>
              <th>Jawaban D</th>
              <th>Jawaban Benar</th>
              <th>Editable</th>
            </tr>
          </thead>
          <tbody>
            {tampilData?.soal.map((contact) => {
              console.log("contact", contact);
              
              
                  if(editContactId === contact.id ){
                    return <EditableRow
                      key={contact.id}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      handleEditFormSave={() => handleEditFormSave(contact.id)}
                    />
                   }
                    
                   return <ReadOnlyRow
                      key={contact.id}
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />

              
            })}
          </tbody>
        </table>
      </form>

      <h2>Tambah Soal dan Jawaban</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="soal"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="jawabanA"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="jawabanB"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="jawabanC"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="jawabanD"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        {/* <input
          type="text"
          name="jawabanBenar"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        /> */}
        <select
          class="custom-select"
          name="jawabanBenar"
          value={addFormData.jawabanBenar}
          onChange={handleAddFormChange}
        >
          <option value={addFormData.jawabanA}>{addFormData.jawabanA}</option>
          <option value={addFormData.jawabanB}>{addFormData.jawabanB}</option>
          <option value={addFormData.jawabanC}>{addFormData.jawabanC}</option>
          <option value={addFormData.jawabanD}>{addFormData.jawabanD}</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="play-button-container">
        <Link className="play-button" to="/">
          Balik ke Home
        </Link>
      </div>
    </div>
  );
};

export default HalamanGuru;

const TAMPIL_SEMUA_SOAL_JAWABAN = gql`
    query MyQuery {
      soal {
        id
        kuncijawaban
        soal
        jawabanA
        jawabanB
        jawabanC
        jawabanD
      }
    }
`;

const TAMBAH_SOAL = gql`
  mutation MyMutation(
    $soal: String = ""
    $kuncijawaban: String = ""
    $jawabanA: String = ""
    $jawabanB: String = ""
    $jawabanC: String = ""
    $jawabanD: String = ""
  ) {
    insert_soal_one(
      object: {
        soal: $soal
        kuncijawaban: $kuncijawaban
        jawabanA: $jawabanA
        jawabanB: $jawabanB
        jawabanC: $jawabanC
        jawabanD: $jawabanD
      }
    ) {
      id
    }
  }
`;

const UPDATE_SOAL = gql`
  mutation MyMutation($soal: String = "", $kuncijawaban: String = "", $jawabanD: String = "", $jawabanC: String = "", $jawabanB: String = "", $jawabanA: String = "", $id: Int = 10) {
  update_soal_by_pk(pk_columns: {id: $id}, _set: {kuncijawaban: $kuncijawaban, soal: $soal, jawabanD: $jawabanD, jawabanC: $jawabanC, jawabanB: $jawabanB, jawabanA: $jawabanA}) {
    id
  }
}

`;

const UPDATE_JAWABAN = gql`
  mutation MyMutation($id: Int = 1, $jawaban: String!) {
    update_jawaban_by_pk(pk_columns: { id: $id }, _set: { jawaban: $jawaban }) {
      jawaban
    }
  }
`;

const DELETE_JAWABAN = gql`
  mutation MyMutation(
    $id: Int = 1
    $jawaban: String!
    $id_soal: Int_comparison_exp = {}
  ) {
    delete_jawaban(where: { id_soal: $id_soal }) {
      returning {
        id_soal
        id
      }
    }
  }
`;
const DELETE_SOAL = gql`
  mutation MyMutation($id: Int!) {
    delete_soal_by_pk(id: $id) {
      id
    }
  }
`;
