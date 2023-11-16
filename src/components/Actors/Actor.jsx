import React, { useState } from 'react'
import { useGetActorsDetailsQuery ,useGetMoviesByActorIdQuery} from '../../services/TMBD';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import useStyle from './ActorStyle.js'
import Pagination from '../Pagination/Pagination.jsx';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import MovieList from '../MovieList/MovieList.jsx';
const Actor = () => {
  const {id} = useParams();
  const [page, setPage] = useState(1)
  const {data, isFetching,error} = useGetActorsDetailsQuery(id);
  const {data:movieData} = useGetMoviesByActorIdQuery({id,page});
  const navigate = useNavigate();
  const classes = useStyle();
  if(isFetching){
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    )

  }
if(error){
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography component={Link} to={navigate(-1)}>An error occured Back to Movie</Typography>
    </Box>
  )
}
  return (
    <>
    <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
          <Box className={classes.btns}>
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
      <Typography variant="h2" gutterBottom align="center">Movies</Typography>
      {movieData && <MovieList movies={movieData} noMovies={12}  />}
    </Box>
    <Pagination currentPage={page} setPage={setPage} totalPages={movieData?.total_pages} />
    </>
      )
}

export default Actor