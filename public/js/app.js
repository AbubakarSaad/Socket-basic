var socket = io();

socket.on('connect', function(){
    console.log("Connected to the server from front");
});

socket.on('message', function(message){
    console.log(message.text);

    jQuery('#messages').append('<li>' + message.text + '<li>');

});

// handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');
});