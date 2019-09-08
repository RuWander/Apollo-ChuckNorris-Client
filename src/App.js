import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoriesList from './components/CategoriesList'
import './App.css';
import Quote from './components/Quote';
import { ProtectedRoute } from "./components/protected.route";
import Login from './components/Login';
import SearchQuote from './components/SearchQuote';
import Register from './components/Register';



const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const middlewareLink  = new ApolloLink((operation, forward) => {
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <ProtectedRoute exact path='/' component={ CategoriesList } />
          <Route exact path='/login' component={ Login } />
          <Route exact path='/Register' component={ Register } />
          <Route exact path='/SearchQuote' component={ SearchQuote } />
          <Route exact path='/category/:category' component={ Quote } />
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;
