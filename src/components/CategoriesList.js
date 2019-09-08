import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import CategoriesItem from './CategoriesItem';

const CATEGORY_QUERY = gql`
  query CategoryQuery {
    categories
  }
`;

const CategoriesList = (props) => {

  const { data, loading, error } = useQuery(CATEGORY_QUERY)
  function logout() {
      localStorage.removeItem('token')
      props.history.push("/login");
  }

  if (loading) {
    return <h4>Loading..</h4>
  }

  if (error) {
    console.log(error)
    return (
      <h4> Some Error{error.message}</h4>
    )
  }

  if (data) {
    return (
      <Fragment>
        <button onClick={()=>logout()}>Logout</button>
        <h1>Categories</h1>
        {
          data.categories.map(category => (
            <CategoriesItem key={category} category={category} />
          ))
        }
      </Fragment>
    )
  }
}

export default CategoriesList