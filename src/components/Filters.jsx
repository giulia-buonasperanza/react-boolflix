import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import genres  from "../data/genres";

function Filters() {
    const { selectedGenre, setSelectedGenre } = useContext(GlobalContext);

    return (
        <select value={selectedGenre} 
        onChange={(event) => setSelectedGenre(event.target.value)}>

            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}

        </select>
    );
}

export default Filters;