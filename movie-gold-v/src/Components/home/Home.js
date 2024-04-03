import React from 'react';
import Hero from '../hero/Hero.js';

const Home = ({movies}) => {
  return (
    <div>
    <Hero movies={movies}/>
    
    </div>
  )
}

export default Home
