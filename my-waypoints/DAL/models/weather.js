var mongoose =require('mongoose');
var Schema =mongoose.Schema;


var weatherSchema =new  Schema({
	//cityId : Schema.ObjectId,   
	city : String,
	weatherInfo : String
});

module.exports= mongoose.model('Weather',weatherSchema);
