var WeatherInfo = require('../models/weatherInfo.js');
var connectionString = 'mongodb://127.0.0.1/weather_info_db';
var mongoose = require('mongoose');
mongoose.connect(connectionString);

function saveWeatherInfo(origin,destination,weatherInfo) {
            var weatherInfoOb = new WeatherInfo();
            weatherInfoOb.origin = origin;
            weatherInfoOb.destination = destination;
            weatherInfoOb.weatherInfo = JSON.stringify(weatherInfo);
            weatherInfoOb.save(function (err, savedWeatherInfo) {
                if (err) {
                    console.log(err);
                }
                //return.
                return(savedWeatherInfo);
            });
}

exports.saveWeatherInfo = saveWeatherInfo;

