import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Movie from "./components/Movie";
import { FaHouseDamage } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { AiTwotoneBug } from "react-icons/ai";

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=`;


function App() {
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);

  const getMovies = (API) => {
    async function fetchData() {
      const moviesResp = await fetch(API);
      const data = await moviesResp.json();
      setMovies(data.results);
      console.log(data.results)
    }
    fetchData();
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const Home = () => {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  };

  const Movies = () => {
    return (
      <div className="movie-container">
      {movies.length > 0 &&
        movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
    )
  }

const Directors = () => {
  return (
    <div>
        <h1>Directors</h1>
    </div>
   );
}



  return (
    <div className="App">
      <Router>
        <header>
          <div className="search-movie">
            <button className="home-button">
              <Link to="/home">
                <FaHouseDamage />
              </Link>
              <Link to="/movies">
                <BiCameraMovie/>
              </Link>
              <Link to="/directors">
                <AiTwotoneBug/>
              </Link>
            </button>
            <form onSubmit={handleOnSubmit}>
              <input
                className="search"
                placeholder="Search..."
                type="search"
                value={searchTerm}
                onChange={handleOnChange}
              />
            </form>
          </div>
        </header>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/movies" exact>
            <Movies/>
          </Route>
          <Route path="/directors" exact>
            <Directors/>
          </Route>
        </Switch>
      </Router>
      {/*  */}
    </div>
  );
}

export default App;
