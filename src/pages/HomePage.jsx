import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Loader from "../components/Loader";
import FlipCard from "../components/FlipCard";
import styles from "./HomePage.module.css";


function HomePage() {
  const {
    trendingMovies,
    trendingSeries,
    movies,
    series,
    search,
    submittedSearch,
    selectedGenreMovies,
    selectedGenreSeries,
    isLoading
  } = useContext(GlobalContext);

  const showMovies = selectedGenreMovies !== "all" || selectedGenreSeries === "all";

  const showSeries = selectedGenreSeries !== "all" || selectedGenreMovies === "all";


  const moviesToShow = submittedSearch.trim() === "" ? trendingMovies : movies;

  const filterMovies = moviesToShow.filter((movie) => {
    if (selectedGenreMovies === "all") {
      return true;
    }
    return movie.genre_ids?.includes(parseInt(selectedGenreMovies, 10));
  });

  const seriesToShow = submittedSearch.trim() === "" ? trendingSeries : series;
  const filteredSeries = seriesToShow.filter((serie) => {

    if (selectedGenreSeries === "all") {
      return true;
    }
    return serie.genre_ids?.includes(parseInt(selectedGenreSeries, 10));
  });


  if (isLoading) {
    return <Loader />;
  }

  return (<>
    {showMovies && (
      <>
        <h2 className="sectionTitle">Movies</h2>

        <div className={styles.moviesGrid}>
          {filterMovies.map((movie) => (
            <FlipCard
              key={movie.id}
              item={movie}
              mediaType="movie"
            />
          ))}
        </div>
      </>
    )}

    {showSeries && (
      <>
        <h2 className="sectionTitle">Series</h2>
        <div className={styles.seriesGrid}>
          {filteredSeries.map((serie) => (
            <FlipCard
              key={serie.id}
              item={serie}
              mediaType="tv"
            />
          ))}
        </div>
      </>
    )}
  </>
  );
}
export default HomePage;
