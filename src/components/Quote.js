import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const QUOTE_QUERY = gql`
  query QuoteQuery($category: String) {
    quoteForCategory(category: $category) {
      id
      value
      icon_url
      created_at
      updated_at
      
    }
  }
`;

export class Quote extends Component {
  render() {
    let { category } = this.props.match.params;
    return (
      <Fragment>
        <Query query={QUOTE_QUERY} variables={{ category }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>
              if (error) console.log(error)
              console.log(data)
              const { id, value, icon_url, created_at, updated_at } = data.quoteForCategory

              return <Fragment>
                <p>{id}</p>
                <p>{value}</p>
                <p>{icon_url}</p>
                <p>{created_at}</p>
                <p>{updated_at}</p>
              </Fragment>
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Quote