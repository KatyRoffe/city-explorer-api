'use strict'

// server setup
require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const axios = require('axios');

const PORT = process.env.PORT || 3001; 
const app = express();
app.use(cors());


app.get('/', (request, response) => {
    response.send('Screaming into the void')
});


function Forecast(day) {
    this.day = day.valid_date;
    this.description = day.weather.description;
}

function Movies(movie) {
  this.image = movie.poster_path;
  this.title = movie.title;
  this.overview = movie.overview;
}

app.get('/weather',  async (request, response) => {
    const lat = request.query.lat;
    const lon = request.query.lon;

    const weatherAPIUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`
    console.log(weatherAPIUrl);
    const weatherResponse = await axios.get(weatherAPIUrl); 
    
    try {
        const weatherArray = weatherResponse.data.data.map(day => {
            return new Forecast(day);
        });
        response.send(weatherArray)
    } catch (error) {
        response.status(400).send('Error. Please try again.');
    }
});

app.get('/movies',  async (request, response) => {
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
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));