import React, { Fragment } from 'react';
import CategoriesList from './CategoriesList';
import SearchQuote from './SearchQuote'

import Typography from '@material-ui/core/Typography';


const HomeContainer = (props) => {
  const homeWrapperStyle = {
    marginTop: '50px'
  }

  return (
    <Fragment>
      <div style={homeWrapperStyle}>
        <Typography variant="h3">
          Welcome to what Chuck Norris Says..
        </Typography>
        <Typography variant="subtitle1">
          Pick a category to see what Chuck Norris would say
        </Typography>
      </div>
      <div style={homeWrapperStyle}>
        <CategoriesList />
      </div>
      <div style={homeWrapperStyle}>
        <Typography variant="h3">
          You can also search for a quote!
        </Typography>
        <Typography variant="subtitle1">
          Just start typing...
        </Typography>
        <SearchQuote />
      </div>

    </Fragment>

  )
}

export default HomeContainer