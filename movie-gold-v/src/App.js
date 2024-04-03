import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './Components/Layout.js';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/home/Home.js';
import Header from './Components/header/Header.js';
import Trailer from './Components/trailer/Trailer.js';
import Review from './Components/review/Review.js';
import Notfound from './Components/notfound/Notfound.js';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [movies, setmovies] = useState([]);
  const [movie, setmovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getmovies = async () => {
   try {

      const response = await api.get("/api/v1/movies");

      setmovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  };


  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setmovie(singleMovie);
      setReviews(singleMovie.reviews);
    }
    catch (e) {
      console.log(e);
    }

  }


  useEffect(() => {
    getmovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />}></Route>
          <Route path="/Reviews/:movieId" element={<Review getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
          <Route path='*' element={<Notfound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
