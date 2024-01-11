import { useState } from "react";
import Box from "./components/Box.js";
import ErrorMessage from "./components/ErrorMessage.js";
import Loader from "./components/Loader.js";
import Logo from "./components/Logo.js";
import Main from "./components/Main.js";
import NavBar from "./components/NavBar.js";
import Search from "./components/Search.js";
import MovieCounter from "./components/MovieCounter.js";
import MoviesList from "./components/MovieList.js";
import MovieDetails from "./components/MovieDetails.js";
import WatchedSummary from "./components/WatchedSummary.js";
import WatchedMoviesList from "./components/WatchedMovieList.js";
import { useMovie } from "./useMovie.js";
import { useLocalStorageState } from "./useLocalStorageState.js";

// const KEY = "bbdf407b";

/* ---------------------------------------------------------------------- */

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { movies, error, isLoading } = useMovie(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <MovieCounter movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {" "}
          {/*{isLoading ? <Loader /> : <MoviesList movies={movies} />}*/}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
