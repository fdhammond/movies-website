import React from 'react';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ overview, poster_path, title, vote_average }) => {
    console.log(poster_path)
    return (
        <div className="movie">
            <img src={IMG_API + poster_path} alt={title}/>
        </div>
    );
};

export default Movie;