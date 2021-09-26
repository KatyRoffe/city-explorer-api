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