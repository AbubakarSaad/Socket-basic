var port = process.env.PORT || 3030;
var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

app.get('/', function(res, req){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	console.log("User connected via socket.io");

	socket.on('message', function(message){
		console.log('Message received: ');
		console.log(message.text);
		

		message.timestamp = moment().valueOf();

		io.emit('message', message);
	}); 

	// timestamp property

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the Chat App',
		timestamp: moment().valueOf()
	});
});

http.listen(port, function(){
	console.log("Server started at: " + port);
});