import React from 'react';
import { Typography,Button } from '@mui/material';
import useStyle from './PaginationStyle.js';
const Pagination = ({currentPage,setPage ,totalPages}) => {
    const classes = useStyle();
    const handlePrev = () =>{
        if(currentPage !== 1){
            setPage((prev) => prev - 1);
        }
    }
    const handleNext = () =>{
     if(currentPage<totalPages){
            setPage((prev) => prev + 1);}
    }
    if (totalPages === 0) return null;
  return (
    <div className={classes.pagination}>
        {currentPage > 1 && <Button onClick={() => {handlePrev()}} variant="contained" className={classes.button} color="primary" type='button'>Prev</Button>}
        <Typography variant='h4' className={classes.page}>{currentPage}</Typography>
        {currentPage<totalPages && <Button onClick={() => {handleNext()}} variant="contained" className={classes.button} color="primary" type='button'>Next</Button>} 
        </div>
  )
}

export default Pagination