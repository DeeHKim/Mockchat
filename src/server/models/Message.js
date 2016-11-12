var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Events = require('./Event');

var messageSchema = mongoose.Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events'
  },
  text: String,
  user: String,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);
