import React ,{useEffect,useState} from 'react';
import {Box,Typography,CircularProgress,useMediaQuery} from '@mui/material';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination.jsx';
import {selectGenreOrCategorie} from '../../features/currentGenreOrCategorie';
import FeatureMovie from '../FeaturedMovie/FeatureMovie.jsx';
import { useGetMovieByTypeQuery } from '../../services/TMBD';
import {MovieList} from '../index.js'
const Movies = () => {
  const [page, setPage] = useState(1)
  const {currentGenreOrCategorieName,searchQuery} = useSelector((state)=>state.currentGenreOrCategorie);
const lg=useMediaQuery((theme)=>theme.breakpoints.only('lg'));

const NooFMovies=lg?16:18;
  
  const {data,error,isFetching} = useGetMovieByTypeQuery({currentGenreOrCategorieName,page ,searchQuery});

  if( isFetching){
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress/>
      </Box>
    )
  }
  if(!data.results.length){
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Typography>No such movie
          <br />
          Try Something else
        </Typography>
      </Box>
    )
  }
  if(error){
    <Box display="flex" justifyContent="center" alignContent="center">
An error Occured
    </Box>
  }
  
  return (
    <>
    <FeatureMovie movie={data.results[0]}/>
      <MovieList movies={data} noMovies={NooFMovies}/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </>
  )
}

export default Movies