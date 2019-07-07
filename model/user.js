var mongoose = require('mongoose');
//mongoose.connect('mongodb://demo:drupal123@ds163781.mlab.com:63781/demo');
mongoose.connect("mongodb://localhost:27017/loginapp", { useNewUrlParser: true });
var db = mongoose.connection;
var Userschema=mongoose.Schema({
     username: String,
     email: String,
     password: String,
     address: String,
     phone: Number
   
});
var User=mongoose.model('users',Userschema);
 
/* db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
	
	Order.find({},function(err,data){
		if(err) throw err;
		//console.log(data);
	})
})*/

 module.exports=User;
