import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovies.css";

function TrailerMovies({ movieTitle }) {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const handleSearch = () => {
    setVideo(movieTitle);
    movieTrailer(video).then((response) => {
      setVideoURL(response);
    });
  };
  useEffect(() => {
    handleSearch();
  }, [videoURL]);
  return (
    <Fragment>
      <div className="container"></div>
      <div className="player">
        <ReactPlayer url={videoURL} controls={true} muted={false} />
      </div>
    </Fragment>
  );
}

export default TrailerMovies;
