
const { Server } = require('socket.io');
const userSockets = new Map();

exports.sendMessage = async (message, email) => {
    console.log(`Sending message to ${email}`);
    const userSocket = await userSockets.get(email);

    if (userSocket) {
        console.log(`userSocket FOUND`);
        userSocket.emit('message', message);
        userSocket.emit('newMessage', message);
    } else {
        console.log(`userSocket not found!!!!`);
    }
    console.log(`The map is:`);
    userSockets.forEach(socket => {
        console.log(`userSocket ${socket}`);
    })
}

exports.initSocketIo = (server) => {

    const io = new Server(server,
        {
            cors: {
                origin: [
                    'http://localhost:3000',
                ]
            }
        });  // Attach socket.io to the server

    io.on('connection', (socket) => {
        console.log('A user connected in socket:', socket.id);

        // Listen for the 'map connection to user' event
        socket.on('connectUser', (email) => {
            // Map userId to socket
            socket.email = email;
            userSockets.set(email, socket);
            console.log(`---------Mapped userId: ${email} to socket ${socket.id}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        socket.on('disconnectUser', () => {
            console.log('User disconnected:', socket.id);

            if (socket.email) {
                userSockets.delete(socket.email);
            }
        });
    });
}

