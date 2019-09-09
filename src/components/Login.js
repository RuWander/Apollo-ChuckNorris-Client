import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom';

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

const Login = (props) => {

  const [values, setValues] = React.useState(false)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const [loginUser, { called, loading, data, error }] = useMutation(
    LOGIN_USER,
    { variables: { email: values.email, password: values.password } }
  )

  if (called && loading) return <h1>Loading...</h1>

  if (error) return <h1>Error Message</h1>

  if (data) {
    localStorage.setItem('token', data.login.token)
    return <Redirect to="/" />
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          loginUser();
        }}
      >
        <input name="email"
          onChange={handleChange('email')}
        />
        <input name="password"
          onChange={handleChange('password')}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login