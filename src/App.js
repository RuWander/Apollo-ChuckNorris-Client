import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CategoriesList from './components/CategoriesList'
import './App.css';
import Quote from './components/Quote'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Route exact path='/' component={ CategoriesList } />
          <Route exact path='/category/:category' component={ Quote } />
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;