'use strict';
// console.log("hello world");



const express = require('exress');
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000

const weather = require("./data/weather.json");
const { response } = require('express');
const


class Forecast {
  constructor(date, description, lat, lon) {
    this.date = date,
    this.description = description,
    this.lat = lat;
    this.lon = lon;
  }
}

app.get('/', (request, response) => {
  response.send('Halp!')
});


app.get("/weather", (req, response) => {

  let cityName = request.query.cityName;
  let weatherData = weather.find(item => item.city_name === cityName);
  }
    try {
      const weatherArray = weatherData.data.map((x) => {
        return new Forecast(x.valid_date, x.weather.description, weatherData.lat, weatherData.lon);
      });
      response.send(weatherArray);

    } catch(error) {
      console.log(error);
    }
);
