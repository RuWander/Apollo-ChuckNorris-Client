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
import Authenticated from './components/Auth';
import HomeContainer from './components/HomeContainer'
import Login from './components/Login';
import SearchQuote from './components/SearchQuote';
import Register from './components/Register';
import RandomQuote from './components/RandomQuote'

import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LoopIcon from '@material-ui/icons/Loop';

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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const App = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Chuck Norris App
              </Typography>
              <Button color="inherit" component={Link} to="/login" onClick={() => Authenticated.logout()} >Logout</Button>
              {/* <Button color="inherit" component={Link} to="/login">Login</Button> */}
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <List>

                <ListItem button component={Link} to="/">
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem button component={Link} to="/randomQuote">
                  <ListItemIcon><LoopIcon /></ListItemIcon>
                  <ListItemText primary="Random Quote" />
                </ListItem>

                <ListItem button component={Link} to="/register">
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>

                <ListItem button component={Link} to="/login">
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>

            </List>

          </Drawer>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Container maxWidth="md">
              <ProtectedRoute exact path='/' component={HomeContainer} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/Register' component={Register} />
              <ProtectedRoute exact path='/SearchQuote' component={SearchQuote} />
              <ProtectedRoute exact path='/randomQuote' component={RandomQuote} />
              <ProtectedRoute exact path='/category/:category' component={Quote} />
            </Container>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App
