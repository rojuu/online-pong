const app = require('express')();
const http = require('http');
const gameport = process.env.PORT || 3000;
const io = require('socket.io');
const UUID = require('node-uuid');
const server = http.Server(app);

const verbose = true;

server.listen(gameport);

console.log('listening on *:' + gameport);

// express setup
app.get('/', function(req, res){
    //send the index.html for the client
    console.log('trying to load %s', __dirname + '/index.html');
    res.sendFile(__dirname + "/index.html");
});

app.get( '/*' , function( req, res, next ) {
    //send any other files the client asks for (like any .js files etc.)
    var file = req.params[0];
    if(verbose) console.log('file requested: ' + file);
    res.sendFile( __dirname + '/' + file);
});

// socket.io setup
const sio = io.listen(server);

sio.sockets.on('connection', function (client) {
    client.id = UUID();
    client.emit('onconnected', { id: client.id } );

    console.log('client: ' + client.id + ', connected');

    client.on('message', function(message) {
        console.log('clientid: ' + client.id + ', message: ' + message);
    });

    client.on('disconnect', function () {
        console.log('client disconnected; ' + client.id);
    });
});
