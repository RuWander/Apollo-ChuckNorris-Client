import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom';

const REGISTER_USER = gql`
mutation LoginUser($username: String, $email: String, $password: String) {
  register(username: $username, email: $email, password: $password){
    user {
      email
      id
    }
    token
  }
}
`;

function Register(props) {

  const [values, setValues] = React.useState(false)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const [RegisterUser, { called, loading, data, error }] = useMutation(
    REGISTER_USER,
    { variables: { username: values.username, email: values.email, password: values.password } }
  )

  if (called && loading) return <h1>Loading...</h1>

  if (error) return <h1>Error Message</h1>

  if (data) {
    localStorage.setItem('token', data.register.token)
    return <Redirect to="/" />
  }


  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          RegisterUser();
        }}
      >
        <input name="username"
          onChange={handleChange('username')}
        />
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

export default Register