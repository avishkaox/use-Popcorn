import NavBar from "./NavBar";
import Main from "./Main";
import { use, useEffect, useState } from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";
import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieDetails from "./MovieDetails";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "8b2740ef";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [slectedMovie, setSelectedMovie] = useState({});

  function updateWatched() {
    setWatched((watched) => [...watched, slectedMovie]);
    console.log(watched);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something Went Wrong with fetching Movies");

          const data = await res.json();
          setMovies(data.Search ?? []);
          // console.log(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        }
      }
      if (query.length <= 3) {
        setMovies([]);
        return;
      }
      fetchMovies();
    },
    [query]
  );

  useEffect(
    function () {
      async function selectedMovieDetails() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) throw new Error("asd");

          const data = await res.json();
          setSelectedMovie(data);
          console.log(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        }
      }
      selectedMovieDetails();
    },
    [selectedId]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search value={query} onChange={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <>
          <ListBox
            selectedId={setSelectedId}
            error={error}
            isLoading={isLoading}
            movies={movies}
          />

          <WatchedBox>
            {selectedId ? (
              <>
                <MovieDetails
                  Poster={slectedMovie.Poster}
                  Title={slectedMovie.Title}
                  Plot={slectedMovie.Plot}
                  updateWatched={updateWatched}
                />
                <button onClick={() => setSelectedId(null)}>Go Back</button>
              </>
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} />
              </>
            )}
          </WatchedBox>
        </>
      </Main>
    </>
  );
}
