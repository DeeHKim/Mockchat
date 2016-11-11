exports = module.exports = function(io) {
  io.on('connection', function(socket) {

    socket.join('intial');

    socket.on('chatmounted', function(user) {
      console.log('user"s socket id', socket.id);
    });

    socket.on('join channel', function(channel) {
      socket.join(channel.name);
    });

    socket.on('new message', function(msg) {
      socket.broadcast.to(msg.channelID).emit('new message', msg);
    });

    socket.on('typing', function(data) {
      socket.broadcast.to(data.channel).emit('typing', data.user);
    });

    socket.on('stop typing', function(data) {
      socket.broadcast.to(data.channel).emit('stop typing', data.user);
    });
  });
};
