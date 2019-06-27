function initializeSocket(SOCKET_PORT, app) {

    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    // Socket configuration
    io.on('connection', (client) => {
        client.on('message', (message) => console.log(message));
    });

    // Express middleware
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // Socket server listening
    io.listen(SOCKET_PORT);
    console.log(`Socket server listening on port ${SOCKET_PORT}`);
}

export { initializeSocket };