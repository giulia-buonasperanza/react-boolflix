import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


function HomePage() {
  const {
    trendingMovies,
    trendingSeries,
    movies,
    series,
    search,
    submittedSearch,
    selectedGenre
  } = useContext(GlobalContext);

  const moviesToShow = submittedSearch.trim() === "" ? trendingMovies : movies;
  const seriesToShow = submittedSearch.trim() === "" ? trendingSeries : series;

  const filterByGenre = moviesToShow.filter((movie) => {
    if (selectedGenre === "all") {
      return true;
    }
    return movie.genre_ids.includes(parseInt(selectedGenre));
  });

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
