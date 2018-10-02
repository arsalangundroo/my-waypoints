var RouteInfo = require('../models/routeInfo.js');
// var openWeatherApi = require('../../third-party-apis/openWeatherApi.js');
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1/route_info_db';
mongoose.connect(connectionString);

function getRouteInfo(start,end, options) {
    var promise = new Promise(
        function (resolve, reject) {
            RouteInfo.find({"origin" : start, "destination" : end}, function (err, routeInfo_db_ob) {
                if (err) {
                    reject(err);
                } else {
                    if (routeInfo_db_ob == null || routeInfo_db_ob.length == 0) {
                        reject(err);
                    } else {
                        resolve(routeInfo_db_ob);
                    }
                }
            });
        });
    return promise;
}

function saveRouteInfo(origin,destination,routeInfo) {
    var promise = new Promise(
        function (resolve, reject) {
            var routeInfoOb = new RouteInfo();
            routeInfoOb.origin = origin;
            routeInfoOb.destination = destination;
            routeInfoOb.routeInfo = JSON.stringify(routeInfo);
            routeInfoOb.save(function (err, savedRouteInfo) {
                if (err) {
                    reject(err);
                }
                resolve(savedRouteInfo);
            });
        });
    return promise;
}

exports.saveRouteInfo = saveRouteInfo;
exports.getRouteInfo = getRouteInfo;
