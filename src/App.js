import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';
import { FontAwesome } from 'react-icons';

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=`;


function App() {
const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(FEATURED_API);
}, [])

  const getMovies = (API) => {
    async function fetchData() {
      const moviesResp = await fetch(API);
      const data = await moviesResp.json();
      setMovies(data.results)
      //console.log(data.results)
    }
    fetchData();
  }

const [searchTerm, setSearchTerm] = useState('')

const handleOnSubmit = (e) => {
    e.preventDefault();
  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm)
    setSearchTerm("")
  }

}

const handleOnChange = (e) => {
  setSearchTerm(e.target.value);

}


return (
  <div className="App">
    <header>
      <div className='search-movie'>
        <button className="home-button">
          Home
        </button>
          <form onSubmit={handleOnSubmit}>
              <input className="search"
                  placeholder="Search..."
                  type="search"
                  value={searchTerm}
                  onChange={handleOnChange} />
          </form>
      </div>
    </header>
    <div className="movie-container">
    {movies.length > 0 && movies.map((movie) =>
      <Movie key={movie.id} {...movie} />
    )}
    </div>
  </div>
);
}

export default App;
