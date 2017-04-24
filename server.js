var express = require('express');
var http = require('http');
var mysql = require('mysql');

var app = express();

var portx = process.env.PORT;  // This is my addition
app.get('/', function (req, res) {
  res.send('Hello World!')
})



var connection = mysql.createConnection({
  host     : '172.16.11.41',
  user     : 'root',
  password : 'demo',
  database : 'ssparkl',
});

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
connection.connect(function(err) {
if(!!err){
    console.log(err.code);
     console.log(err.fatal); 
}  else{
    console.log('Success');
}
});
app.get('/countries/:page/:start', function (req, res) {
	
	let limit = req.params.page;
	let ofset = req.params.start;
	connection.query('SELECT * FROM trp_countries LIMIT '+ofset+','+limit, function(err,rows,fields) {
    if(!!err){
     console.log(err.code);  
  console.log(err.fatal);
}  else{
   res.send(rows); 
}   
});
})
app.get('/countrydetails/:uuid/', function (req, res) {
	
	let uuid = req.params.uuid;
	connection.query('SELECT trp_countries.country_code,trp_countries.country_name,trp_countries.continent_name,trp_countries.currency_code,trp_countries.capital,trp_states.name FROM trp_countries  LEFT JOIN trp_states ON trp_states.country_id = trp_countries.id WHERE trp_countries.uuid ="'+uuid+'"', function(err,rows,fields) {
    if(!!err){
    console.log(err.code);  
	console.log(err.fatal);
}  else{
   res.send(rows); 
}   
});
})













app.set("port", portx);  // to here
app.listen(app.get("port"), function () {
  console.log('Example app listening on port '+app.get("port")+'!')
})
