import React, { useState, useEffect } from "react";
import useStyle from "./SeachStyle.js";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../../features/currentGenreOrCategorie";
const Search = () => {
  const classes = useStyle();
  const [useQuery, seteQuery] = useState("");
  const locataion = useLocation();
  const dispatch=useDispatch();
  const handleKeypress = (event) => {
    if(event.key === 'Enter'){
        dispatch(searchMovie(useQuery))
    }
  };

  if(locataion.pathname !== '/')  return null

  return (
    <div className={classes.search}>
      <TextField
        onKeyPress={handleKeypress}
        value={useQuery}
        onChange={(e) => {
          seteQuery(e.target.value);
        }}
        variant="standard"
        InputProps={{
          className: classes.searchInput,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default Search;
