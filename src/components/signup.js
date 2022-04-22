import './login.scss';
import React , {Fragment, useState} from 'react';
import './home.scss';
import {Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { ValuesOfCorrectTypeRule } from 'graphql';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'



function Signup(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [doSignup, { data, loading, error }] = useMutation( REGISTER_USER , {onError : (error) =>
  {
    alert("account exist");
  }
,onCompleted : (data) => {
    navigate('/halamanguru')
}}) ;

 
  const handleSubmit = (e) => {
    e.preventDefault();
    doSignup({variables: {username,password,email,},})};

  return (
    <div>
    <div class ="header"> </div>
    <Form onSubmit={handleSubmit}>
     <Form.Field>
       <Form.Input
      label="username"
      placeholder="username"
      name="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      ></Form.Input>
    </Form.Field>
    <Form.Field>

    <Form.Input
      label="password"
      placeholder="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      ></Form.Input>

    <Form.Input
      label="email"
      placeholder="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      ></Form.Input>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </div>
  )
}

const REGISTER_USER = gql`
mutation MyMutation($email: String = "", $username: String = "", $password: String = "") {
    insert_userGuru(objects: {email: $email, username: $username, password: $password}) {
      returning {
        password
        username
        email
      }
    }
  }
  `


    
    export default Signup