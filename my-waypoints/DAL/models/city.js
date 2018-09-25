var mongoose =require('mongoose');
var Schema =mongoose.Schema;


var citySchema =new  Schema({
	//cityId : Schema.ObjectId,   
	city : String
});

module.exports= mongoose.model('City',citySchema);
