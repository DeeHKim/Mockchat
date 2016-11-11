var restify = require('restify');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var SocketIo = require('socket.io');

mongoose.connect("mongodb://dankller516:Dankller51@ds149567.mlab.com:49567/keybloc_test");


var controllers = {};
var controllers_path = process.cwd() + './controllers';
fs.readdirSync(controllers_path).forEach(function (file) {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
  }
});

var server = restify.createServer({
  name: 'keybloc_chat'
});

restify.CORS.ALLOW_HEADERS.push('authorization');
server.pre(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get(/\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));


//Api routes






var app = server.listen(3000, function() {
  console.log('%s listening at %s', 3000);
});

var io = new SocketIo(app, {path: '/api/chat'});
var socketEvents = require('./socketEvents')(io);
