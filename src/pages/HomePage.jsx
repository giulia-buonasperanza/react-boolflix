import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Loader from "../components/Loader";


function HomePage() {
  const {
    trendingMovies,
    trendingSeries,
    movies,
    series,
    search,
    submittedSearch,
    selectedGenre,
    isLoading
  } = useContext(GlobalContext);

  const moviesToShow = submittedSearch.trim() === "" ? trendingMovies : movies;
  const seriesToShow = submittedSearch.trim() === "" ? trendingSeries : series;

  const filterByGenre = moviesToShow.filter((movie) => {
    if (selectedGenre === "all") {
      return true;
    }
    return movie.genre_ids.includes(parseInt(selectedGenre));
  });
 
  if (isLoading) {
    return <Loader />;
  }

  return (<>

    <h2>Movies</h2>
    <ul>
      {filterByGenre.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
    <h2>Series</h2>
    <ul>
      {seriesToShow.map((serie) => (
        <li key={serie.id}>{serie.name}</li>
      ))}
    </ul>
  </>
  );
}
export default HomePage;
