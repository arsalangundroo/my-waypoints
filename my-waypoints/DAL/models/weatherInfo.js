var mongoose =require('mongoose');
var Schema =mongoose.Schema;

var weatherInfoSchema =new  Schema({
	origin : String,
	destination : String,
	weatherInfo : String
});

module.exports= mongoose.model('WeatherInfo',weatherInfoSchema);
