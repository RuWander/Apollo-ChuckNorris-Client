import React from 'react';
import {  useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LOGIN_USER = gql`
mutation LoginUser($email: String, $password: String) {
  login(email: $email, password: $password){
    user {
      email
      id
    }
    token
  }
}
`;


function Login(props) {

  let email;
  let password;
  const[ login, { data }] = useMutation(LOGIN_USER);

  if (data) {
    if(data.login.token) {
      localStorage.setItem('token', data.login.token)
      // return props.history.push('/');
    }
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login({ variables: { email: email.value, password: password.value } });
          password.value = '';
        }}
      >
        <input
          ref={node => {
            email = node;
          }}
        />
        <input
          ref={node => {
            password = node;
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login