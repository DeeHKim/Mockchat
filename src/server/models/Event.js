var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  name: {
      type: String,
  },
});

module.exports = mongoose.model('Events', eventSchema);
