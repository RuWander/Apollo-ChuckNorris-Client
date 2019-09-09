import React, { Fragment } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import debounce from 'lodash/debounce';
import Moment from 'react-moment'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';



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
    updated_at
  }
}
`;

const  SearchQuote = (props) => {
  const classes = useStyles();

  const [searchQuote, { data, error, loading }] = useLazyQuery(SEARCH_QUOTE);

  const [searchString, setSearchString] = React.useState('')
  const handleChange = event => {
    console.log('Change happened')
    setSearchString(event.target.value)
    if (searchString.length < 3) return
    debounceFunction()
  }

  const debounceFunction = debounce(() => {
    console.log('debounce' + searchString)
    searchQuote({ variables: { search: searchString } });
  }, 100)

  if (error) {
    return (
      <div>
        <Fragment>
          <TextField
            id="outlined-with-placeholder"
            label="Just start typing here..."
            placeholder="Placeholder"
            margin="normal"
            variant="outlined"
            name="searchString"
            value={searchString}
            onChange={handleChange}
          />
        </Fragment>
        <h3>Some error occurred... Sorry about that, please try again soon</h3>
        <h5>{error.message}</h5>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <Fragment>
          <TextField
            id="outlined-with-placeholder"
            label="Just start typing here..."
            placeholder="Placeholder"
            margin="normal"
            variant="outlined"
            name="searchString"
            value={searchString}
            onChange={handleChange}
          />
        </Fragment>
        <CircularProgress className={classes.progress} />
      </div>

    )
  }

  if (data && data.searchQuote) {
    console.log(data.searchQuote)
    return (
      <div>
        <Fragment>
          <TextField
            id="outlined-with-placeholder"
            label="Just start typing here..."
            placeholder="Placeholder"
            margin="normal"
            variant="outlined"
            name="searchString"
            value={searchString}
            onChange={handleChange}
          />

        </Fragment>
        <Grid container spacing={3}>
          {data.searchQuote.map(q => {
            return (
              <Grid key={q.id} item xs={12} sm={4} md={3}>
                <Card >
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        <FormatQuoteIcon />
                    </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        
                      </IconButton>
                    }
                    title="Chuck Said..."
                    subheader={<Moment format="YYYY-MM-DD">{q.updated_at}</Moment>}
                  />
                  <CardContent>
                    <Typography>
                      {q.value}
                    </Typography>
                  </CardContent>
                </Card>

              </Grid>
            )
          })}
        </Grid>

      </div>
    )
  }

  return (
    <div>
      <Fragment>
        <TextField
          id="outlined-with-placeholder"
          label="Just start typing here..."
          placeholder="Placeholder"
          margin="normal"
          variant="outlined"
          name="searchString"
          value={searchString}
          onChange={handleChange}
        />
      </Fragment>
    </div>
  );
}

export default SearchQuote

