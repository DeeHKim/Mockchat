var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Events = require('../models/Event');

exports.getEvents = function(req, res) {
  console.log("HII");
    Events.find({}, {_id: 1, name: 1}, function(err, data) {
      if(err) {
        console.log(err);
        return res.state(500).json({msg: 'internal server error'});
      }
      
      res.json({
        data: data
      });
    });
};

exports.createEvent = function(req, res) {
    var newEvent = new Events(req.body);
    newEvent.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
};
