import React , {Fragment, useState} from 'react';
import './home.scss';
import {Link} from 'react-router-dom'
import './loginSiswa.scss';
import 'semantic-ui-css/semantic.min.css'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { ValuesOfCorrectTypeRule } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'



function LoginSiswa(){
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");

  const [doSignup, { data, loading, error }] = useMutation( REGISTER_USER) ;

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    doSignup({variables: {nama,kelas,},})
    navigate('/Quiz')
  };

  return (
    <div>
    <div class ="header"> </div>
    <Form onSubmit={handleSubmit}>
     <Form.Field>
       <Form.Input
      label="Nama"
      placeholder="Nama"
      name="Nama"
      value={nama}
      onChange={(e) => setNama(e.target.value)}
      ></Form.Input>
    </Form.Field>
    <Form.Field>

    <Form.Input
      label="Kelas"
      placeholder="Kelas"
      name="Kelas"
      value={kelas}
      onChange={(e) => setKelas(e.target.value)}
      ></Form.Input>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </div>
  )
}

const REGISTER_USER = gql`
mutation MyMutation($kelas: String = "", $nama: String = "") {
  insert_userMurid(objects: {kelas: $kelas, nama: $nama}) {
    returning {
      kelas
      nama
    }
  }
}

  `

export default LoginSiswa