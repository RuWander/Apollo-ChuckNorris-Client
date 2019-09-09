import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 340,
    marginTop: "60px",
    margin: 'auto'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Register(props) {
  const classes = useStyles();

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
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h2" component="h2">
          Register
        </Typography>
        <Divider />
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="username"
              label="Username here please"
              name="username"
              onChange={handleChange('username')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="email"
              label="Email here please"
              name="email"
              onChange={handleChange('email')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              label="Password here"
              name="password"
              type="password"
              onChange={handleChange('password')}
            />
          </Grid>
        </Grid>

      </CardContent>
      <CardActions>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button variant="contained" color="primary" onClick={() => RegisterUser()} size="large">Register</Button>
      </CardActions>
    </Card>
  );
}

export default Register