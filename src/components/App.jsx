import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Movies, Profie, Actor, MovieDetail } from "./index.js";
import useStyle from './styles.js'
const App = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
    <Router>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
      <Routes>
     
      <Route path="/" element={<Movies />}>
        <Route index element={<Movies />} />
        <Route path="*" element={<Movies />} />
      </Route>
        <Route path="/profile/:id" element={<Profie />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/actor/:id" element={<Actor />} />
      </Routes></main>
    </Router></div>
  );
};

export default App;
