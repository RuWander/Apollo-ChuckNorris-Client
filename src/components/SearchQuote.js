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

  function handleChange(e) {
    console.log('Change happened')
    debounceFunction()
  }

  const debounceFunction = debounce(() => {
    console.log('debounce')
    searchQuote({ variables: { search: searchString.value } });
}, 1000)
 
  let searchString;
  const[ searchQuote, { data }] = useLazyQuery(SEARCH_QUOTE);

  if (data && data.searchQuote) {
    return (<div>
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
      { data.searchQuote.map(q => <p key={q.id}>{q.value}</p> ) }
    </div>)
  }
 

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          searchQuote({ variables: { search: searchString.value } });
        }}
      >
        <input onChange={handleChange}
          ref={node => {
            searchString = node;
          }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SearchQuote