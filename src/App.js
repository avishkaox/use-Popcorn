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
import StarRating from "./StarRating";



const KEY = "8b2740ef";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [slectedMovie, setSelectedMovie] = useState({});
  const [rating, setRating] = useState(0);
  
  const [watched, setWatched] = useState(function(){
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue)
  });

  function updateWatched() {
    setWatched((watched) => [...watched, slectedMovie??'']);
    // localStorage.setItem('watched' , JSON.stringify([...watched , slectedMovie]))
    console.log(watched);
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
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

  useEffect(
    function () {
      document.title = `Movie:${slectedMovie.Title ??'UsePopcorn' }`;
    },
    [slectedMovie]
  );

  useEffect(function(){
    localStorage.setItem('watched' , JSON.stringify([...watched , slectedMovie??'']))
  },[watched , slectedMovie])

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
                  element={
                    <StarRating
                      rating={rating}
                      setRating={() => setRating()}
                      maxRating="10"
                    />
                  }
                />
                <button onClick={() => setSelectedId(null)}>Go Back</button>
              </>
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  onClick={handleDeleteWatched}
                  watched={watched}
                />
              </>
            )}
          </WatchedBox>
        </>
      </Main>
    </>
  );
}
