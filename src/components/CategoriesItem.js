import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function CategoriesItem({ category }) {
  const classes = useStyles();
  // console.log(category);
  return (

    <Chip
      label={category}
      className={classes.chip}
      component={Link}
      to={`/category/${category}`}
      clickable
    />
    // <Link to={`/category/${category}`}>{category}</Link> 

  )
}