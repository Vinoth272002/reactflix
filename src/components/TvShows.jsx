import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { container } from "./NavBar";
import "../Styles/Movies.css";
import TrailerTvShows from "../Trailers/TrailerTvShows";

function TvShows() {
  const { toggle, inputValue } = useContext(container);
  const input = inputValue;
  const [shows, setShows] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");

  const shown = input ? "search" : "discover";

  const Api = `https://api.themoviedb.org/3/${shown}/tv`;
  const Images = "https://image.tmdb.org/t/p/w500/";

  const tvShows = async () => {
    const data = await axios.get(Api, {
      params: { api_key: "59c0c201d3a375735065f126da9ab7a3", query: input },
    });
    const responseData = data.data.results;
    setShows(responseData);
  };

  useEffect(() => {
    setTimeout(() => {
      tvShows();
    }, 100);
  }, [input]);

  const tvShowTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {shows.map((show) => {
            return (
              <Fragment key={show.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    id={trailer ? "playIcon" : "hide"}
                    color="#fff"
                    fontSize={40}
                    onClick={() => tvShowTitle(show)}
                  />
                  <img
                    src={
                      show.poster_path
                        ? `${Images}${show.poster_path}`
                        : "https://www.vectorstock.com/royalty-free-vectors/no-picture-vectors"
                    }
                    alt="Imgpath"
                    onClick={() => {
                      tvShowTitle(show);
                    }}
                  />
                  <h3
                    id={show.name.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {show.name}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerTvShows title={title} />}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            fontSize={55}
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default TvShows;
