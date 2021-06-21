var mysql = require('mysql');
var connection = mysql.createPool({
	host:'us-cdbr-east-04.cleardb.com',
	user:'b7622333aa8b54',
	password:'0c241f64',
	database:'heroku_0907de482616b3d'
});
// connection.connect(function(error){
// 	if(!!error) {
// 		connection;
// 		console.log(error);
// 	} else {
// 		console.log('Connected..!');
// 	}
// });

module.exports = connection;