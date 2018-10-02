var openWeatherApi = require('../third-party-apis/openWeatherApi.js');
var googleMapsApi = require('../third-party-apis/googleMapsApi.js');
var mapStore = require('../DAL/store/mapStore.js');
function getRouteWithWaypoints(req_body, options) {
	var promise = new Promise(
		function (resolve, reject) {
			mapStore.getRouteInfo(req_body.origin,req_body.destination, options).then(successGet, errorGet);
			function successGet(routeInfo_db_ob) {
				if (routeInfo_db_ob == null) {
					getRouteAndWeatherFromApi(req_body, promise);
				} else {
					// openWeatherApi.getWeatherForRoute(req_body).then(
					// 	function success(weatherInfo) {
					// 		// ToDo: merge route and weather info 
					// 		resolve(routeInfoWithWeather);
					// 	},
					// 	function (err) {
					// 		resolve(routeInfo)
					// 		//reject(err);
					// 	});
					resolve(routeInfo_db_ob[0].routeInfo);
				}
			}
			function errorGet(err) {
				getRouteAndWeatherFromApi(req_body, promise);
			}

            function getRouteAndWeatherFromApi(req_body, promise) {

				googleMapsApi.getRouteWithWaypoints(req_body).then(
					function success(routeInfo) {
						resolve(routeInfo);

						mapStore.saveRouteInfo(req_body.origin,req_body.destination,routeInfo).then(
							function (savedRouteInfo) {
								console.log("route saved in db: "+savedRouteInfo);
								// weatherStore.saveWeatherData(weatherData).then(
								// 	function (data) {
								// 		//TODO: log new data entry 
								// 	},
								// 	function error(err) {
								// 		//TODO: log error.
								// 	});
							},
							function error() {
								//TODO: log error.
								console.log(error);
							});

						//var coordinates_of_route = google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline.points);
						/*openWeatherApi.getWeatherForWaypoints(coordinates_of_route).then(
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
											});
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


