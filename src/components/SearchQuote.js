import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import debounce from 'lodash/debounce';

const SEARCH_QUOTE = gql`
query searchQuote($search: String) {
  searchQuote(search: $search){
    id
    value
  }
}
`;

function SearchQuote(props) {

  const SearchForm = () => {
    return (
      <form
        onSubmit={(e) => {
          console.log(e)
          e.preventDefault();
          searchQuote({ variables: { search: searchString.value } });
        }}
      >
        <input onChange={handleChange}
          ref={node => {
            searchString = node;
          }}
        />

        <button type="submit">search</button>
      </form>
    )
  }

  const handleChange = (e) => {
    console.log('Change happened')
    debounceFunction()
  }

  const debounceFunction = debounce(() => {
    console.log('debounce')
    searchQuote({ variables: { search: searchString.value } });
  }, 1000)

  let searchString;
  const [searchQuote, { data, error, loading }] = useLazyQuery(SEARCH_QUOTE);

  if (error) {
    return (
      <div>
        <SearchForm />
        <h3>Some error occurred... Sorry about that, please try again soon</h3>
        <h5>{error.message}</h5>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <SearchForm />
        <h1>Loading...</h1>
      </div>

    )
  }

  if (data && data.searchQuote) {
    return (
      <div>
        <SearchForm />
        {data.searchQuote.map(q => <p key={q.id}>{q.value}</p>)}
      </div>
    )
  }

  return (
    <div>
      <SearchForm />
    </div>
  );
}

export default SearchQuote

