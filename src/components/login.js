
import './login.scss';
import React , {Fragment, useState} from 'react';
import './home.scss';
import {Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { ValuesOfCorrectTypeRule } from 'graphql';
import gql from 'graphql-tag';
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import { setCookie } from "nookies";


function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();
  const [doLogin, { data, loading: loadingGet, errorGet }] =
  
    useLazyQuery(LOGIN_USER, {onCompleted : (data) => {
      console.log(data)
      if (data.userGuru.length === 0) {
        alert("login gagal");
      } else {
        setCookie(null, "userId", data.userGuru[0].id)
        navigate('/halamanguru')
      }
    } ,}); 

    
    const handleSubmit = (e) => {
      e.preventDefault();
      doLogin({
        variables: {
          username,
          password,
        },
      })
    
    };

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
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </div>
  )
}

const LOGIN_USER = gql`
query MyQuery($username: String ,  $password: String ) {
  userGuru(where: {username:{_eq:$username}, password:{_eq:$password}}) {
    username
    password
    id
  }
}
  `
    
    export default Login