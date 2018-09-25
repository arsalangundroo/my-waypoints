// var Weather = require('../models/weather.js');
// var openWeatherApi = require('../../third-party-apis/openWeatherApi.js');

function getRouteInfo(endpoints, options) {
    var promise = new Promise(
        function (resolve, reject) {
            // Maps.find({ city: city_name }, function (err, weatherInfo) {
            //     if (err) {
            //         reject(err);
            //     } else {
            //         if (weatherInfo == null || weatherInfo.length == 0) {
            //             reject(err);
            //         } else {
            //             resolve(weatherInfo);
            //         }
            //     }
            // });
            resolve(null);
        });
    return promise;
}

// function saveWeatherData(weatherData) {
//     var promise = new Promise(
//         function (resolve, reject) {
//             var weatherOb = new Weather();
//             weatherOb.city = weatherData.city.name;
//             weatherOb.weatherInfo = weatherData.list;
//             weatherOb.save(function (err, savedWeatherOb) {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(savedWeatherOb);
//             });
//         });
//     return promise;
// }

// exports.getWeatherForCity = getWeatherForCity;
exports.getRouteInfo = getRouteInfo;
