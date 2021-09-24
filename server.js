'use strict'

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

app.get('/weather',  async (request, response) => {
    const lat = request.query.lat;
    const lon = request.query.lon;

    const weatherAPIUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`
    console.log(weatherAPI);
    const weatherResponse = await axios.get(weatherAPIUrl); 
    
    try {
        const weatherArray = weatherResponse.data.data.map(day => {
            return new Forecast(day);
        });
        response.send(weatherArray)
    } catch (error) {
        response.status(400).send('Please try again.');
    }
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));