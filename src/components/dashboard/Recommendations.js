import React, { useEffect } from "react";
// tools
import { connect } from "react-redux";
import { ifDev } from "../../utils/removeAttribute.js";
import {
  recommendedAction,
  recommendationAction,
  toggleIsUploaded,
  setFilter
} from "../../store/actions/index.js";
// children components
import LoadingScreen from "../layout/LoadingScreen.js";
import MovieCard from "../movies/MovieCard.js";

function Recommendations({
  isFetching,
  recommendations,
  userid,
  recommendedAction,
  recommendationAction,
  searchTerm, 
  isUploaded,
  setFilter
}) {
  useEffect(() => {
    setFilter("")
    // returns initial recommendations after uploading a file
    if (isUploaded === true) {
      recommendationAction(userid);
      toggleIsUploaded();
    }
    // Returns the most recent recommendations from the database
    recommendedAction(userid);

  }, [ recommendedAction, userid, isUploaded, recommendationAction, setFilter ]);

  if (isFetching) return <LoadingScreen />;
  else
    return (
      <div
        className="container recommendations"
        data-test={ifDev("recommendations-component")}
      >
        <div className="movie-cards">
          {recommendations
          .filter( movie => 
            searchTerm !== '' ? 
              movie.Title
              .toString()
              .toLowerCase()
              .includes(
                searchTerm
                .toLowerCase()
              ) 
            : true 
          )
          .map((movie, index) => {
            let posterURI = movie["Poster URL"];
            let unsplashUrl =
              "https://source.unsplash.com/collection/1736993/500x650";
            let moviePoster = 
              `https://image.tmdb.org/t/p/w500${posterURI}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

            return (
              <MovieCard
                key={index}
                rated={null}
                name={movie.Title}
                year={movie.Year}
                image={
                  !posterURI ||
                  posterURI === "None" ||
                  posterURI === "No poster" ||
                  posterURI === "No Poster" ||
                  posterURI === "Not in table"
                    ? unsplashUrl
                    : moviePoster
                }
              />
            );
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userid: state.login.userid,
    isFetching: state.recommendations.isFetching,
    recommendations: state.recommendations.movies,
    recommendationsError: state.recommendations.error,
    searchTerm: state.filter.searchTerm,
    isUploaded: state.upload.isUploaded
  };
};

export default connect(mapStateToProps, {
  recommendedAction,
  recommendationAction,
  toggleIsUploaded,
  setFilter
})(Recommendations);
