'use strict';
// console.log("hello world");

const express = require('express');
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());


class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get('/', (request, response) => {
  response.send('Screaming into the void')
});
// huzzah, this returns on localhost:3001
// not sure if the weather stuff works yet


app.get('/weather', async (request, response) => {

  const cityWeather = request.query.cityName;
  const weatherForecast = weather.find(city => city.city_name === cityWeather);
  const lat = request.query.lat;
  const lon = request.query.lon;

  const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily/?city=${cityWeather}&key=${process.env.WEATHER_API_KEY}`);
  
 
  if(weatherForecast) {
    const weatherData = weatherForecast.data.map(result => new Forecast(result));
    response.send(weatherData);
  } else {
    response.status(500).send('Invalid Reponse. Please enter new city.');
  }
});

app.get('/movies', async (request, resonse)) => {
  const cityMovies = request.query.cityMovies;
  const movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=1&include_adult=false`);

}




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

