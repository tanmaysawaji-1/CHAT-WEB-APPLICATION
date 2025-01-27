
// //Node server which will handle socket.io connections
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
    // When a new user joins, store their name
    socket.on('new-user-joined', name => {
        // console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // When a message is sent, broadcast it to other users
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // Optional: Handle user disconnect
    socket.on('disconnect', message => {
        // Remove the user when they disconnect
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
   
});