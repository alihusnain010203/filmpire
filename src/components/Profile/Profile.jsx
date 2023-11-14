import React from 'react'
import { useSelector } from 'react-redux'
import {Box,Typography,Button} from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
const Profile = () => {
  const {user}=useSelector((state)=>state.user);
  const FavouriteMovies=[];
 const Logout=()=>{
   localStorage.clear();
   window.location.href="/"
 }
  return (
  
     <Box>
<Box display="flex" justifyContent="space-between">
  <Typography variant="h4" gutterBottom>Profile</Typography>
  <Button color='inherit' onClick={Logout}  startIcon={<ExitToApp />}>Logout &nbsp;</Button>
</Box>
{!FavouriteMovies.length ? (
  <Typography variant="h5">No Favourite Movies and watchlist</Typography>
) : (
  FavouriteMovies.map((movie) => (
    <Box key={movie.id} p={2}>
      <Typography variant="h6">{movie.title}</Typography>
    </Box>
  ))
)
}
     </Box>
  )
}

export default Profile