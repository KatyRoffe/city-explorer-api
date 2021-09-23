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


app.get("/weather", (request, response) => {

  const cityName = request.query.cityName;
  const weatherForecast = weather.find(city => city.city_name === cityName);
 
  if(weatherForecast) {
    const weatherArray = weatherForecast.data.map(result => new Forecast(result));
    response.send(weatherArray);
  } else {
    response.status(500).send('Invalid Reponse. Please enter new city.')
  }
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

