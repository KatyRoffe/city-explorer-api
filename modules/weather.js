//does not like 'use strict'

const axios = require('axios');

function Forecast(day) {
  this.day = day.valid_date;
  this.description = day.weather.description;
}

getWeather = async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  const weatherAPIUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`
  const weatherResponse = await axios.get(weatherAPIUrl); 
  
  try {
    const weatherArray = weatherResponse.data.data.map(day => {
      return new Forecast(day);
    });
    res.send(weatherArray)
  } catch (error) {
      res.status(400).send('Error. Please try again.');
  }
};

module.exports = {getWeather: getWeather}


////working copy of an idea, not entirely sure if it would work, need to figure out how to integrate

// if (cache[wKey] && (Date.now() - cache[wKey].timestamp < ????? )){ // figure out timestamps
//   console.log('weather Cache hit');
// } else {
//   console.log('weather Cache miss');
//   try{
//     cache[wKey] = {};
//     cache[wKey].timestamp = Date.now();
//     cache[wKey].data = await axios.get(weatherAPI_URL); // do I need to do another axios?
//   } catch (error) {
//     cache[wKey] = undefined;
//   }
// }

// try{
//   let weatherResponse = cache[wKey].data;
//   const weatherArr = weatherResponse.data.data.map(day => new Forecast(day));
//   response.status(200).send(weatherArr);
// } catch (error) {
//   res.status(400).send('Error. Please try again.');
// }

