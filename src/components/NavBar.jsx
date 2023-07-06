import React, { Fragment, useState } from "react";
import { HiSearch } from "react-icons/hi";
import "../Styles/NavBar.css";
import { Link, Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import TvShows from "./TvShows";
import Trends from "./Trending";
import Pricing from "./Pricing";

export const container = React.createContext();

function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");

  return (
    <container.Provider value={{ toggle, inputValue }}>
      <Fragment>
        <nav className={toggle ? "" : "navBarColor"}>
          <div className="nav-options">
            <h1 id={toggle ? "" : "heading"}>REACTFLIX</h1>
            <Link to="/react_movie_app_clone">
              <span id={toggle ? "Movies" : "MoviesLight"}>Movies</span>
            </Link>
            <Link to="/TvShows">
              <span id={toggle ? "Movies" : "MoviesLight"}>Tv Shows</span>
            </Link>
            <Link to="/Trending">
              <span id={toggle ? "Movies" : "MoviesLight"}>Trending</span>
            </Link>
            <Link to="/pricing">
              <span id={toggle ? "Movies" : "MoviesLight"}>pricing</span>
            </Link>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search Whatever you Want"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HiSearch
              fontSize={23}
              color={toggle ? "black" : "#ff206e"}
              id="search"
            />
            <div id="Color-Switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/react_movie_app_clone" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trending" element={<Trends />} />
          <Route path="pricing" element={<Pricing />} />
        </Routes>
      </Fragment>
    </container.Provider>
  );
}

export default NavBar;
