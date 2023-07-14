import React, { Fragment, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";

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
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyle = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <container.Provider value={{ toggle, inputValue }}>
      <Fragment>
        <main
          className=" paddings innerWidth  n-container flexCenter"
          id={toggle ? "" : "navBarColor"}
        >
          <div className="nav-options flexCenter innerWidth  ">
            <h1 id={toggle ? "" : "heading"}>REACTFLIX</h1>

            <OutsideClickHandler
              onOutsideClick={() => {
                setMenuOpened(false);
              }}
            >
              <div
                className="n-manu flexCenter"
                style={getMenuStyle(menuOpened)}
              >
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
            </OutsideClickHandler>

            <div className="input-group  flexCenter">
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
          </div>
          <div
            className="menu-icon"
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        </main>
        <Routes>
          <Route path="/reactflix" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trending" element={<Trends />} />
          <Route path="pricing" element={<Pricing />} />
        </Routes>
      </Fragment>
    </container.Provider>
  );
}

export default NavBar;
