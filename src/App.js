import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const moviesResp = await fetch(FEATURED_API);
      const data = await moviesResp.json();
      setMovies(data.results)
      console.log(data.results)
    }
    fetchData();
  }, [])


  return (
    <div className="App">
      <div className="movie-container">
      {movies.length > 0 && movies.map((movie) =>
        <Movie key={movie.id} {...movie} />
      )}
      </div>
    </div>
  );
}

export default App;
