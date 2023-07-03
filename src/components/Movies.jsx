import axios from "axios";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { container } from "./NavBar";
import "../Styles/Movies.css";
import TrailerMovies from "../Trailers/TrailerMovies";

function Movies() {
  // Use Context
  const { toggle, inputValue } = useContext(container);
  const input = inputValue;
  // Use Sate
  const [moviesData, setMoviesData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  const shown = input ? "search" : "discover";
  // API Libks
  const Api = `https://api.themoviedb.org/3/${shown}/movie`;
  const Images = "https://image.tmdb.org/t/p/w500/";

  // Using API links fetch Data
  const movieCall = async () => {
    const data = await axios.get(Api, {
      params: { api_key: "59c0c201d3a375735065f126da9ab7a3", query: input },
    });
    const responseData = data.data.results;
    setMoviesData(responseData);
  };

  useEffect(() => {
    setTimeout(() => {
      movieCall();
    }, 100);
  }, [input]);

  const movieShow = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => movieShow(movie)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${Images}${movie.poster_path}`
                        : "https://www.vectorstock.com/royalty-free-vectors/no-picture-vectors"
                    }
                    alt="imgPath"
                    onClick={() => movieShow(movie)}
                  />
                  <h3
                    id={movie.title.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerMovies movieTitle={movieTitle} />}
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

export default Movies;
