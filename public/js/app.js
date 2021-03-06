var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
socket.on('connect', function(){
    console.log("Connected to the server from front");
});

socket.on('message', function(message){

    var momentTimeStamps = moment.utc(message.timestamp);
    var $message = jQuery('#messages');
    console.log(message.text);

    $message.append('<li><strong>' + message.name + ' ' + momentTimeStamps.local().format('h:mm a') + ': </strong> ');
    $message.append('<li>' + message.text + '<li>');

});

// handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');
});