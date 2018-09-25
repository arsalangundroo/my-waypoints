var express = require('express');
var when = require('when');
var controller = require('../controllers/routeInfoController.js');
var router = express.Router();
var https = require('https');

router.route('/post').post(getRouteWithWaypoints);
router.route('/get').get(getRoutes);

function getRouteWithWaypoints(req, res, next){
    var options = {};
	when(controller.getRouteWithWaypoints(req.body, options),
		function success(wayPoints) {
			res.send(wayPoints);
		},
		function error(err) {
			res.send(err);
		});
}

function getRoutes(endpoints) {
    
            var request = https.get('https://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=via:Charlestown,MA|via:Lexington,MA&departure_time=now&key=AIzaSyAN6_UJyFJWL65Xf2xAIRSfmYJdbgkLrAM', function (response) {
                var body = '';
                response.on('data', function (chunk) {
                    body += chunk;
                });

                response.on('end', function () {
                    if (response.statusCode === 200) {
                        try {
                            //Parse the data
                            var routeInfo = JSON.parse(body);
                            response.send(routeInfo);
                        } catch (error) {
                            response.send(error);
                        }
                    } else {
                        response.send(error);
                    }
                });
            });
}

module.exports=router;
