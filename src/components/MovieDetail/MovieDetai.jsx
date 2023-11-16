import React, { useState,useEffect } from 'react'
import {Modal,Typography,Button,ButtonGroup,Grid,Box,useMediaQuery,CircularProgress,Rating} from '@mui/material';
import {Movie as MovieIcon,Theaters,Language,Favorite,FavoriteBorderOutlined,Remove,PlusOne,ArrowBack} from '@mui/icons-material';
import MovieList from '../MovieList/MovieList.jsx';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategorie } from '../../features/currentGenreOrCategorie';
import { REACT_APP_TMDB_KEY } from '../../../env.js';
import { selectUser } from '../../features/auth.js';
import { useNavigate } from 'react-router-dom';
import genreIcons from '../../assets/genres/index.js';
import axios from 'axios';
import { useGetMovieDetailQuery , useGetRecomendedMoviesQuery,useGetFavouriteAndWatchlistQuery } from '../../services/TMBD';
import useStyle from './MovieDetailStyle.js';
const MovieDetai = () => {
  const navigate=useNavigate();
  const {user} =useSelector(selectUser);
  const {user_id}=user;
  const session_id=localStorage.getItem('session_id');
  const {id}=useParams();
  const classes=useStyle();
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false);
  const [isFavourite,setIsFavourite]=useState(false);
  const [isWatchlist,setIsWatchlist]=useState(false);
  const {data,isFetching,error}=useGetMovieDetailQuery(id);
  const {data:recomendedMovies,isFetching:recomendedIsFetching}=useGetRecomendedMoviesQuery({movie_id:id});
  const {data:favouritelist,isFetching:favouriteIsFetching}=useGetFavouriteAndWatchlistQuery({user_id:user.id,session_id,ListName:'favorite',page:1});
  const {data:Watchlist,isFetching:WatchlistIsFetching}=useGetFavouriteAndWatchlistQuery({user_id:user.id,session_id,ListName:'watchlist',page:1});

  const addToFavorites=async()=>{
    await axios.post(`https://api.themoviedb.org/3/account/${user_id}/favorite?api_key=${REACT_APP_TMDB_KEY}&session_id=${session_id}`,{
      media_type:'movie',
      media_id:id,
      favorite:!isFavourite
    });
    setIsFavourite(!isFavourite)
  }
  const addToWatchList=async()=>{
    await axios.post(`https://api.themoviedb.org/3/account/${user_id}/watchlist?api_key=${REACT_APP_TMDB_KEY}&session_id=${session_id}`,{
      media_type:'movie',
      media_id:id,
      watchlist:!isWatchlist
    });
    setIsWatchlist(!isWatchlist)
  }
  useEffect(() => {
    setIsFavourite(!!favouritelist?.results?.find((movie) => movie?.id === data?.id));
  }, [favouritelist, data]);
  useEffect(() => {
    setIsWatchlist(!!Watchlist?.results?.find((movie) => movie?.id === data?.id));
  }, [Watchlist, data]);
  if(isFetching){
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="6rem"/>
      </Box>
    )
  }
  if(error){
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong</Link>
      </Box>
    )
  }
  
  return (
    <Grid container className={classes.containerSpaceAround}>
    <Grid item sm={12} lg={4} align="center">
      <img
        src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        className={classes.poster}
        alt={data?.title}
      />
    </Grid>
    <Grid item container direction="column" lg={7}>
      <Typography variant="h3" align="center" gutterBottom>
        {data?.title} ({data.release_date.split('-')[0]})
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        {data?.tagline}
      </Typography>
      <Grid item className={classes.containerSpaceAround}>
        <Box display="flex" align="center">
          <Rating readOnly value={data.vote_average / 2} precision={0.1} />
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ marginLeft: "10px" }}
          >
            {data?.vote_average.toFixed(1)} / 10
          </Typography>
        </Box>
        <Typography variant="h6" align="center" gutterBottom>
          {data?.runtime}min {data?.spoken_languages.length > 0 ? `| ${data?.spoken_languages[0].name}` : ""} 
        </Typography>
      </Grid>
      <Grid item className={classes.genresContainer}>
        {data?.genres.map((genre,i) => (
          <Link
            key={genre.name}
            className={classes.links}
            to="/"
            onClick={()=>{dispatch(selectGenreOrCategorie(genre.id))}}
          >
            <img
              src={genreIcons[genre.name.toLowerCase()]}
              className={classes.genreImage}
              alt={genre.name}
            />
            <Typography color="textPrimary" variant="subtitle1">
              {genre?.name}
            </Typography>
          </Link>
        ))}
        </Grid>
        <Typography variant="h5" gutterBottom align="center">
          Overview
        </Typography>
        <Typography style={{ wordBreak: "break-word" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character,i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actor/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
       
          </Grid>
          <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonContainer}>
         <Grid item xs={12} sm={6} className={classes.button}>
          <ButtonGroup size='small' className={classes.buttonGroup}>
            <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
              Website
            </Button>
            <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
              IMDB
            </Button>
<Button onClick={()=>{setOpen(true)}} endIcon={<Theaters />}>
              Trailer
            </Button>
          </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.button}>
          <ButtonGroup size='small' className={classes.buttonGroup}>
            <Button onClick={addToFavorites} endIcon={isFavourite ? <FavoriteBorderOutlined />: <Favorite />}>
              {isFavourite ? "Unfavorite" : "Favorite"}
            </Button>
            <Button onClick={addToWatchList} endIcon={isWatchlist ? <Remove /> : <PlusOne />}>
              {isWatchlist ? "Remove" : "Watchlist"}
            </Button>
            <Button endIcon={<ArrowBack />} onClick={()=>{navigate(-1)}} sx={{borderColor:'primary.main'}}>
             <Typography style={{ textDecoration: 'none' }} variant='subtitle2' color='inherit'>Back</Typography>
            </Button>
          </ButtonGroup>
          </Grid>
          </div>
            </Grid>
        
      </Grid>
      <Box width={"100%"} mt={5}>
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
       {recomendedMovies ? (
         <MovieList movies={recomendedMovies} />
       ):(
          <Box display="flex" justifyContent="center" alignContent="center">
            <Typography variant="h6" gutterBottom align="center">
              No recomended movies
            </Typography>
            </Box>
       )

       }
      </Box>
      <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
{data?.videos?.results?.length > 0 && (
  <iframe
    autoPlay
    className={classes.video}
    frameBorder="0"
    title="Trailer"
    src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
    allow="autoplay"
   />
)}
      </Modal>
  </Grid>
  )
}

export default MovieDetai