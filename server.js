var express = require('express');
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 3030;


app.use(express.static(__dirname + '/public'));



app.listen(port, function(){
	console.log("Server started at: " + port);
});