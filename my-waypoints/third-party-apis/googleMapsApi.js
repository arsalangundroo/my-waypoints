var https = require('https');

var API_KEY = 'AIzaSyAN6_UJyFJWL65Xf2xAIRSfmYJdbgkLrAM';

function getRouteWithWaypoints(req_body,options) {
    var promise = new Promise(
        function (resolve, reject) {
            //var waypoints_param_string=process_waypoints_params(req_body.waypoints);
            // https://maps.googleapis.com/maps/api/directions/json?origin='+req_body.origin+'&destination='+req_body.destination+'&waypoints='+waypoints_param_string+'&departure_time=now&mode='+req_body.travelMode+'&key='+API_KEY
            var request = https.get('https://maps.googleapis.com/maps/api/directions/json?origin='+req_body.origin+'&destination='+req_body.destination+'&departure_time=now&mode='+req_body.travelMode+'&key='+API_KEY, function (response) {
                var body = '';
                response.on('data', function (chunk) {
                    body += chunk;
                });

                response.on('end', function () {
                    if (response.statusCode === 200) {
                        try {
                            //Parse the data
                            var routeInfo = JSON.parse(body);
                            resolve(routeInfo);
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

function process_waypoints_params(waypoints){
    var param_string='';
    if(waypoints!==null){
    for (var waypoint in waypoints) {
        if(waypoint.stopover===true){
            if(param_string===''){
                param_string = param_string + 'via:'+waypoint.location;
            }else{
                param_string = param_string + '|via:'+waypoint.location;
            }
        }
        //via:Charlestown,MA|via:Lexington,MA
    }
    }
    return param_string; 
}

exports.getRouteWithWaypoints = getRouteWithWaypoints;