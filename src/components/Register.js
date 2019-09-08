import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom';

const REGISTER_USER = gql`
mutation RegisterUser($username: String, $email: String, $password: String) {
  register(username: $username, email: $email, password: $password){
    user {
      username
      email
      id
    }
    token
  }
}
`;

function Register(props) {

  let username;
  let email;
  let password;
  const [register, { data, error, loading }] = useMutation(REGISTER_USER);

  const LoginForm = () => {
    return (<form
      onSubmit={e => {
        e.preventDefault();
        register({ variables: { username: username.value ,email: email.value, password: password.value } });
        password.value = '';
      }}
    >
      <input
        ref={node => {
          username = node;
        }}
      />
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
      <button type="submit">Register</button>
    </form>)
  }

  if (error) {
    console.log(error.message)
    return (
      <div>
        <LoginForm />
        <h5>Some Error Occurred: {error.message}</h5>
      </div>

    )
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (data) {
    if (data.register.token) {
      console.log(data.register.token)
      localStorage.setItem('token', data.register.token)
      // return props.history.push('/');
      return <Redirect to="/" />
    }
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Register