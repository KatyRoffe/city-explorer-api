'use strict'

// server setup
require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const axios = require('axios');

const PORT = process.env.PORT || 3001; 
const app = express();
app.use(cors());

//module imports
const {getWeather} = require('./modules/weather.js');
const {getMovies} = require('./modules/movies.js');


// routes
app.get('/', (request, response) => {
    response.send('Screaming into the void')
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));