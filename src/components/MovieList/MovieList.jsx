import React from 'react';
import useStyle from './MovieListStyle.js';
import { Grid } from '@mui/material';
import Movie from '../Movie/Movie.jsx'
const MovieList = ({movies}) => {
    const classes = useStyle();
  return (
    <Grid container className={classes.moviesContainer}>
{movies.results.map((movie ,i)=>{
 return (
 <Movie key={i} movie={movie} i={i}/> 
  )
})}
    </Grid>
  )
}

export default MovieList;