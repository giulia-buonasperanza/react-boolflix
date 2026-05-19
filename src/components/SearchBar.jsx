import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";




function SearchBar() {
    const { search, setSearch, fetchContents } = useContext(GlobalContext);

    function handleSubmit(event) {
        event.preventDefault();

        fetchContents();
    }


    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input className="input-group-text"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cerca un film o una serie TV..."
            />
            <button className="btn btn-light" type="submit">Cerca</button>
        </form>
    )
}
export default SearchBar;