import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { container } from "./NavBar";
import "../Styles/Movies.css";
import TrailerTrendings from "../Trailers/TrailerTrendings";

function Trending() {
  const { toggle } = useContext(container);

  const [trends, setTrends] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [trendsTitle, setTrendsTitle] = useState("");

  const Api = "https://api.themoviedb.org/3";
  const Images = "https://image.tmdb.org/t/p/w500/";
  const trendsShown = "/trending/all/week";

  const trendsData = async () => {
    const data = await axios.get(`${Api}${trendsShown}`, {
      params: {
        api_key: "59c0c201d3a375735065f126da9ab7a3",
      },
    });
    const responseData = data.data.results;
    setTrends(responseData);
  };
  useEffect(() => {
    setTimeout(() => {
      trendsData();
    });
  }, []);
  const trendingTitle = (trend) => {
    setTrendsTitle(trend.title);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {trends.map((trending) => {
            return (
              <Fragment key={trending.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => trendingTitle(trending)}
                  />
                  <img
                    src={
                      trending.poster_path
                        ? `${Images}${trending.poster_path}`
                        : "https://www.vectorstock.com/royalty-free-vectors/no-picture-vectors"
                    }
                    alt="imgPath"
                    onClick={() => trendingTitle(trending)}
                  />
                  <h3
                    id="smaller-Text"
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {trending.title} {trending.name}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? (
            console.log
          ) : (
            <TrailerTrendings trendsTitle={trendsTitle} />
          )}
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

export default Trending;
