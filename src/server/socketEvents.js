exports = module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.on('chatmounted', function(user) {
      console.log('user"s socket id', socket.id);
    });

    socket.on('leave channel', function(channel) {
      var leavechannel = JSON.stringify(channel);
      socket.leave(leavechannel);
      socket.leave(channel);
      // socket.disconnect();
    });

    socket.on('join channel', function(channel) {
      var channelid = JSON.stringify(channel);
      socket.join(channelid);
    });

    socket.on('new message', function(msg) {
      var channelid = JSON.stringify(msg.eventID);
      socket.broadcast.to(channelid).emit('new message', msg);
    });

    socket.on('typing', function(data) {
      var channelid = JSON.stringify(data.channel);
      socket.broadcast.to(channelid).emit('typing', data.user);
    });

    socket.on('stop typing', function(data) {
      var channelid = JSON.stringify(data.channel);
      socket.broadcast.to(channelid).emit('stop typing', data.user);
    });
  });
};
