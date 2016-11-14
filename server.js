var restify = require('restify');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var SocketIo = require('socket.io');
// var express = require('express');
var bodyParser = require('body-parser');
// var app = express();
var cors = require('cors');

mongoose.connect("mongodb://keybloc:keybloc123@ds149567.mlab.com:49567/keybloc_test");


var controllers = {};
var controllers_path = process.cwd() + '/src/server/controllers';
fs.readdirSync(controllers_path).forEach(function (file) {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
  }
});

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(express.static(__dirname));
// app.use(cors());

// app.get('/', function(req,res) {
//   res.sendFile(__dirname + '/index.html');
// });
//
// app.get('*', function (req, res){
// 	res.sendFile(path.resolve(__dirname + '/index.html'));
// });

var app = restify.createServer({
  name: 'keybloc_chat'
});

restify.CORS.ALLOW_HEADERS.push('authorization');
app.pre(restify.CORS());
app.use(restify.fullResponse());
app.use(restify.bodyParser());

console.log(__dirname);

app.get(/\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

app.get(/\/chat\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

app.get(/\/events\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));



//Api routes
app.post('/events/getEvents', controllers.events.getEvents);
app.post('/events/newEvent', controllers.events.createEvent);
app.post('/messages/getMessages', controllers.messages.getMessages);
app.post('/messages/newMessage', controllers.messages.newMessage);





var server = app.listen(3000, function() {
  console.log('%s listening at %s', 3000);
});

var io = new SocketIo(server, {path: '/api/chat'});
var socketEvents = require('./src/server/socketEvents')(io);
