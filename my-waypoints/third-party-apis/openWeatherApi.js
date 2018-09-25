var http = require('http');

var API_KEY = '503576a6446d97d28664f2e42787f134';

function getWeatherForCity(city_name) {
    var promise = new Promise(
        function (resolve, reject) {
            var request = http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city_name + '&cnt=14&APPID=' + API_KEY, function (response) {
                var body = '';

                response.on('data', function (chunk) {
                    body += chunk;
                });

                response.on('end', function () {
                    if (response.statusCode === 200) {
                        try {
                            //Parse the data
                            var weatherInfo = JSON.parse(body);
                            resolve(weatherInfo);
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        reject(error);
                    }
                });
            });
        });
    return promise;
}

exports.getWeatherForCity = getWeatherForCity;