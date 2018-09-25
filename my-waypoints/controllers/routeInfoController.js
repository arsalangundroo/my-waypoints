var openWeatherApi = require('../third-party-apis/openWeatherApi.js');
var googleMapsApi = require('../third-party-apis/googleMapsApi.js');
var mapStore = require('../DAL/store/mapStore.js')
function getRouteWithWaypoints(req_body, options) {
	var promise = new Promise(
		function (resolve, reject) {
			mapStore.getRouteInfo(req_body, options).then(successGet, errorGet);
			function successGet(routeInfo) {
				if (routeInfo == null) {
					getRouteAndWeatherFromApi(req_body, promise);
				} else {
					openWeatherApi.getWeatherForRoute(req_body).then(
						function success(weatherInfo) {
							// ToDo: merge route and weather info 
							resolve(routeInfoWithWeather);
						},
						function (err) {
							resolve(routeInfo)
							//reject(err);
						});
				}
			}
			function errorGet(err) {
				getRouteAndWeatherFromApi(req_body, promise);
			}

            function getRouteAndWeatherFromApi(req_body, promise) {

				googleMapsApi.getRouteWithWaypoints(req_body).then(
					function success(routeInfo) {
						resolve(routeInfo);
						/*openWeatherApi.getWeatherForWaypoints(req_body.waypoints).then(
							function success(weatherInfo) {
								// ToDo: merge route and weather info 
								resolve(routeInfoWithWeather);
								//save the newly fetched city and its weather info
							    cityStore.saveCity(city_name).then(
									function () {
										weatherStore.saveWeatherData(weatherData).then(
											function (data) {
												//TODO: log new data entry 
											},
											function error(err) {
												//TODO: log error.
											}
										);
									},
									function error() {
										//TODO: log error.
									});
							},
							function error(err) {
								reject(err);
							}
						);*/
					},
					function (err) {
						reject(err);
					}
				);
			}
		});
	return promise;
}


exports.getRouteWithWaypoints = getRouteWithWaypoints;


