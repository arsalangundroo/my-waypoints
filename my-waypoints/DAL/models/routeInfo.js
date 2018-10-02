var mongoose =require('mongoose');
var Schema =mongoose.Schema;


var routeInfoSchema =new  Schema({   
	origin : String,
	destination : String,
	routeInfo : String
});

module.exports= mongoose.model('RouteInfo',routeInfoSchema);
