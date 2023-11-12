import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import useStyle from "./MovieStyle.js";
const Movie = ({ movie, i }) => {
  const classes = useStyle();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <div style={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center"} }>
        <Link className={classes.links} to={`movie/${movie.id}`}>
          <img className={classes.image} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://www.fillmurray.com/200/300'} alt="" />
        </Link>
        <Typography className={classes.title} variant="h6">
          {movie.title}
        </Typography>
        <Tooltip title={`${movie.vote_average} / 10`} placement="top" arrow disableTouchListener>
        <div>
        <Rating name="read-only" value={movie.vote_average/2} precision={0.1} readOnly />
        </div>
        </Tooltip>
        </div>
      </Grow>
    </Grid>
  );
};

export default Movie;
