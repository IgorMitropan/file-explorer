import io from 'socket.io-client';

export const socket = io();

socket.on('disconnect', (reason) => {
    if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
    }
})
