//1.packages

import express from 'express';
import http from 'http'
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { io as socketIOClient } from 'socket.io-client';


//2. Instances
const client = socketIOClient('http://localhost:3000');
const app = express()
const server = http.createServer(app);
const io = new Server(server);

//3. Serving HTML File
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => res.sendFile(join(__dirname, 'index.html')));

//4.Define a connection

io.on('connection', (socket) => {
    console.log("User Connected To (Server)");
})

client.on('new message', (message) => {
    console.log(message);
} )

// //Emmit a 'message' event to the client
//     client.emit('message', "Welcome to the server")



client.on("disconnect", () => {
    console.log("User Disconnected From (Server)");
 })

// 5. Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

