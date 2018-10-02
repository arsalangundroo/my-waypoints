var express = require('express');
var when = require('when');
var controller = require('../controllers/routeInfoController.js');
var router = express.Router();
var https = require('https');
var weatherStore = require('../DAL/store/weatherStore.js');

router.route('/post').post(getWeatherForWaypoints);

function getWeatherForEachLocation(waypoint,options) {
    var promise = new Promise(
        function (resolve, reject) {
            //var waypoints_param_string=process_waypoints_params(req_body.waypoints);
            // https://maps.googleapis.com/maps/api/directions/json?origin='+req_body.origin+'&destination='+req_body.destination+'&waypoints='+waypoints_param_string+'&departure_time=now&mode='+req_body.travelMode+'&key='+API_KEY
            var request = https.get('https://api.openweathermap.org/data/2.5/weather?lat='+waypoint.lat+'&lon='+waypoint.lng+'&appid=e117f91bef75e8f02e515355e4818089', function (response) {   
            
                var body = '';
                response.on('data', function (chunk) {
                    body += chunk;
                });

                response.on('end', function () {
                    if (response.statusCode === 200) {
                        try {
                        var weatherInfo = JSON.parse(body);
                                weather_info_response={
                                    "lat":waypoint.lat,
                                    "lng":waypoint.lng,
                                    "weatherInfo":weatherInfo.main
                                };
                                resolve(weather_info_response);
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

function getWeatherForWaypoints(req, res, next){
    var options = {};
    var fetchWeatherInfo = req.body.waypoints.map(getWeatherForEachLocation);
    Promise.all(fetchWeatherInfo).then(function(responses){
        res.send(responses);
        weatherStore.saveWeatherInfo(req.body.origin,req.body.destination,responses,
            function (savedWeatherInfo) {
                console.log("route saved in db: "+savedWeatherInfo);
            },
            function (error){
                console.log(error);
            });
        
    })
}

module.exports=router;
