import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Quote from './components/Quote';
import { ProtectedRoute } from "./components/protected.route";
import HomeContainer from './components/HomeContainer'
import Login from './components/Login';
import SearchQuote from './components/SearchQuote';
import Register from './components/Register';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || ''
    }
  });
  return forward(operation);
});


const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App(props) {
  const classes = useStyles();

  // const isloggedIn = () => {
  //   return localStorage.getItem('token') !== null ? true : false
  // }

  // function logout() {
  //   localStorage.removeItem('token')
  //   // props.history.push("/login");
  //   return <Redirect to="/logout" />
  // }

  return (
    <ApolloProvider client={client}>

      <Router>
        <div className="App">

          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Chuck Norris App
              </Typography>
              {/* <Button color="inherit" onClick={() => logout()} >Logout</Button> */}
              <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
          </AppBar>



          <Container maxWidth="md">
            <ProtectedRoute exact path='/' component={HomeContainer} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/Register' component={Register} />
            <ProtectedRoute exact path='/SearchQuote' component={SearchQuote} />
            <ProtectedRoute exact path='/category/:category' component={Quote} />
          </Container>
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;
