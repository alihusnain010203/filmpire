import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Box,Typography,Button} from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { selectUser } from '../../features/auth'
import RatedCards from '../RatedCard/RatedCard'
import { useGetFavouriteAndWatchlistQuery } from '../../services/TMBD'
const Profile = () => {
  const {user}=useSelector(selectUser);
  const {user_id}=user;
  const session_id=localStorage.getItem('session_id');
  const {data:favouritelist,isFetching:favouriteIsFetching,refetch:refetchFavourite}=useGetFavouriteAndWatchlistQuery({user_id:user.id,session_id,ListName:'favorite',page:1});
  const {data:Watchlist,isFetching:WatchlistIsFetching,refetch:refetchWatchList}=useGetFavouriteAndWatchlistQuery({user_id:user.id,session_id,ListName:'watchlist',page:1});
  console.log(favouritelist);
  console.log(Watchlist);

 const Logout=()=>{
   localStorage.clear();
   window.location.href="/"
 }
 useEffect(()=>{
  refetchFavourite();
refetchWatchList();
 },[])
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={Logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouritelist?.results?.length && !Watchlist?.results?.length
        ? <Typography variant="h5">Add favourite or watchlist same movies to see them here!</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" movies={favouritelist} />
            <RatedCards title="Watchlist" movies={Watchlist} />
          </Box>
        )}
    </Box>
  )
}

export default Profile