import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


function Filters() {
    const { selectedGenreMovies, setSelectedGenreMovies, 
        selectedGenreSeries, setSelectedGenreSeries,
        movieGenres, tvGenres
     } = useContext(GlobalContext);

    return (<>
        <select className="form-select" value={selectedGenreMovies}
            onChange={(event) => {
                console.log("Selected genre for movies:", event.target.value);
                setSelectedGenreMovies(event.target.value); }}>
            <option value="all">Tutti i Film</option>
            {movieGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
       
        <select className="form-select"
        value={selectedGenreSeries}
            onChange={(event) => setSelectedGenreSeries(event.target.value)}>
            <option value="all">Tutte le Serie</option>
            {tvGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    </>
    );
}

export default Filters;