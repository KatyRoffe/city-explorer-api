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

//what what what? 