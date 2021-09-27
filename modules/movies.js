//does not like 'use strict'

const axios = require('axios');

function Movies(movie) {
  this.imageURL = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  this.title = movie.title;
  this.overview = movie.overview;
}

getMovies = async (request, response) => {
  const citySearch = request.query.searchQuery
  const movieAPIUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${citySearch}&language=en-US&page=1&include_adult=false`
  
  const movieResponse = await axios.get(movieAPIUrl); 

  try {
      const movieArray = movieResponse.data.results.map(movie => {
          return new Movies(movie);
      });
      response.send(movieArray)
  } catch (error) {
      response.status(400).send('Error. Please try again.');
  }
};

module.exports = {getMovies: getMovies}

////working copy of an idea, not entirely sure if it would work, need to figure out how to integrate

// if (cache[mKey] && (Date.now() - cache[mKey].timestamp < ????? )){ //gotta figure out timestamps
//   console.log('movie Cache hit');
// } else {
//   console.log('movie Cache miss');
//   try{
//     cache[mKey] = {};
//     cache[mKey].timestamp = Date.now();
//     cache[mKey].data = await axios.get(movieAPI_URL);
//   } catch (error) {
//     cache[mKey] = undefined;
//   }
// }

// try{
//   let movieResponse = await axios.get(movieAPI_URL); // do I need to do another axios here?
//   const movieArray = movieResponse.data.results.map(movie => new Movie(movie));
//   response.status(200).send(movieArray);
// } catch (error) {
//   response.status(400).send('Error. Please Try Again');
//}