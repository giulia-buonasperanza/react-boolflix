import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const API_TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function GlobalProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingSeries, setTrendingSeries] = useState([]);

    function fetchTrending() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TMDB_TOKEN}`
            }
        };

        const trendingMovieFetch = fetch(`${API_TMDB_BASE_URL}/trending/movie/day?language=it-IT`, options)
            .then((response) => {
                return response.json();
            });

        const trendingSerieTvFetch = fetch(`${API_TMDB_BASE_URL}/trending/tv/day?language=it-IT`, options)
            .then((response) => {
                return response.json();
            });

        Promise.all([trendingMovieFetch, trendingSerieTvFetch])
            .then(([trendingMovieData, trendingSerieTvData]) => {
                setTrendingMovies(trendingMovieData.results);
                setTrendingSeries(trendingSerieTvData.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {
        fetchTrending();
    }, []);

    function fetchContents() {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TMDB_TOKEN}`
            }
        };

        const movieUrl = `${API_TMDB_BASE_URL}/search/movie?query=${search}&language=it-IT`;
        const serieTvUrl = `${API_TMDB_BASE_URL}/search/tv?query=${search}&language=it-IT`;

        if (search.trim() === "") {
            setMovies([]);
            setSeries([]);
            return;
        };
        setIsLoading(true);

        const movieFetch = fetch(movieUrl, options)
            .then((response) => {
                return response.json();
            });


        const serieTvFetch = fetch(serieTvUrl, options)
            .then((response) => {
                return response.json();
            });


        Promise.all([movieFetch, serieTvFetch])
            .then(([movieData, serieTvData]) => {
                setMovies(movieData.results);
                setSeries(serieTvData.results);
            })
            .catch((error) => {
                console.error("Errore durante il fetch:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    const contextValue = {
        movies,
        series,
        search,
        setSearch,
        isLoading,
        fetchContents,
        fetchTrending,
        selectedGenre,
        setSelectedGenre,
        trendingMovies,
        trendingSeries

    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};




export { GlobalProvider, GlobalContext };
