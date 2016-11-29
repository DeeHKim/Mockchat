var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Message = require('../models/Message');

exports.getMessages = function(req, res) {
  console.log("WOEIFJWEIOJ", req.body._id);
  console.log(req.body);
  Message.find({eventID: ObjectId(req.body._id)}, {_id: 1, eventID: 1, text: 1, image: 1, user: 1, created: 1}, function(err, data) {
    if(err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
    res.json(data);
  });
};

exports.newMessage = function(req, res) {
  var event_id = req.body.eventID;
  var messageInfo = req.body;

  messageInfo.eventID = ObjectId(event_id);

  var newMessage = new Message(messageInfo);
  newMessage.save(function(err, data) {
    if(err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }
    // console.log('cs', currentSocket);
    // console.log('cc', currentChannel);
    var obj = {
      hi: "hi"
    };
    console.log(socketInfo);
    var socket = socketInfo[req.body.user];
    console.log("sockettt", socket);
    socket.currentSocket.broadcast.to(socket.currentChannel).emit("test socket", obj);
    res.json(data);
  });
};
