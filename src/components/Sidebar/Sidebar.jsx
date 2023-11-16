import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyle from "./Sidebarstyle.js";
import { useGetGenresQuery } from "../../services/TMBD.js";
import genresIcon from "../../assets/genres/index.js";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategorie } from "../../features/currentGenreOrCategorie.js";
const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const blueLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];
const Sidebar = ({ setOpenMobile }) => {
   const { currentGenreOrCategorieName } = useSelector(
     (state) => state.currentGenreOrCategorie
   )
   useEffect(() => {
     setOpenMobile(false);
   }, [currentGenreOrCategorieName]);
  const { error, data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const classes = useStyle();
  const theme = useTheme();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => {
          return (
            <Link to={`/`} className={classes.link} key={value}>
              <ListItem
                onClick={() => {
                  dispatch(selectGenreOrCategorie(value));
                }}
                button
              >
                <ListItemIcon>
                  <img
                    src={genresIcon[label.toLowerCase()]}
                    className={classes.genre}
                    height={30}
                    alt=""
                  />
                </ListItemIcon>
                <ListItemText sx={{ textDecoration: "none" }} primary={label} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => {
            return (
              <Link to={`/`} className={classes.link} key={name}>
                <ListItem
                  onClick={() => {
                    dispatch(selectGenreOrCategorie(id));
                  }}
                  button
                >
                  <ListItemIcon>
                    <img
                      src={genresIcon[name.toLowerCase()]}
                      className={classes.genre}
                      height={30}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textDecoration: "none" }}
                    primary={name}
                  />
                </ListItem>
              </Link>
            );
          })
        )}
      </List>
    </>
  );
};

export default Sidebar;
