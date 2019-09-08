import React, { Fragment } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import debounce from 'lodash/debounce';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const SEARCH_QUOTE = gql`
query searchQuote($search: String) {
  searchQuote(search: $search){
    id
    value
  }
}
`;

function SearchQuote(props) {
  const classes = useStyles();

  const SearchForm = () => {
    return (
      <Fragment>
        <TextField
          id="outlined-with-placeholder"
          label="Just start typing here..."
          placeholder="Placeholder"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
  
        />
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
      </Fragment>

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
        <CircularProgress className={classes.progress} />
        {/* <h1>Loading...</h1> */}
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

