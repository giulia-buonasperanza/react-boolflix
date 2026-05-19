import { use } from "react";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const API_TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

function GlobalProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    const [search, setSearch] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [selectedGenreMovies, setSelectedGenreMovies] = useState("all");
    const [selectedGenreSeries, setSelectedGenreSeries] = useState("all");

    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);

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


    function fetchGenres() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TMDB_TOKEN}`
            }
        };

        const movieGenreUrl = `${API_TMDB_BASE_URL}/genre/movie/list?language=it-IT`;
        const serieTvGenreUrl = `${API_TMDB_BASE_URL}/genre/tv/list?language=it-IT`;

        const movieGenreFetch = fetch(movieGenreUrl, options)
            .then((response) => {
                return response.json();
            });
        const serieTvGenreFetch = fetch(serieTvGenreUrl, options)
            .then((response) => {
                return response.json();
            });

        Promise.all([movieGenreFetch, serieTvGenreFetch])
            .then(([movieGenreData, serieTvGenreData]) => {
                setMovieGenres(movieGenreData.genres);
                setTvGenres(serieTvGenreData.genres);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchGenres();
    }, []);



    function fetchContents() {

        setSubmittedSearch(search);

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


    function fetchDetail(id, mediaType) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TMDB_TOKEN}`
            }
        };

        const url = `${API_TMDB_BASE_URL}/${mediaType}/${id}?language=it-IT`;

        return fetch(url, options)
            .then((response) => {
                return response.json();
            });
    }


    function resetHome() {
        setSearch("");
        setSubmittedSearch("");
        setSelectedGenreMovies("all");
        setSelectedGenreSeries("all");
        setMovies([]);
        setSeries([]);
    }



    function renderStars(voteAverageRaw) {
        const voteAverage = ( voteAverageRaw ?? 0 )/ 2;
        const fullStars = Math.floor(voteAverage);
        const halfStar = voteAverage - fullStars >= 0.5;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="bi bi-star-fill text-warning" />);
            } else if (i === fullStars && halfStar) {
                stars.push(<i key={i} className="bi bi-star-half text-warning" />);
            }
            else {
                stars.push(<i key={i} className="bi bi-star text-warning" />);
            }
        }
        return stars;
    }

    const contextValue = {
        movies,
        series,
        search,
        setSearch,
        submittedSearch,
        setSubmittedSearch,
        isLoading,
        fetchContents,
        fetchTrending,
        selectedGenreMovies,
        setSelectedGenreMovies,
        movieGenres,
        tvGenres,
        selectedGenreSeries,
        setSelectedGenreSeries,
        trendingMovies,
        trendingSeries,
        renderStars,
        resetHome,
        fetchDetail
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};




export { GlobalProvider, GlobalContext };
