import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CategoriesItem from './CategoriesItem'

const CATEGORY_QUERY = gql`
  query CategoryQuery {
    categories
  }
`;

export class CategoriesList extends Component {
  render() {
    return (
      <Fragment>
        <h1>Categories</h1>
        <Query query={CATEGORY_QUERY}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading..</h4>
              if (error) console.log(error)

              return <Fragment>
                {
                  data.categories.map(category => (
                    <CategoriesItem key={category} category={category} />
                  ))
                }
              </Fragment>
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default CategoriesList