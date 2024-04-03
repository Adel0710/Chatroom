import express from 'express';
import http from 'http'
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import { io as socketIOClient } from 'socket.io-client';


const client = socketIOClient('http://localhost:4200');
const app = express()
const server = http.createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

app.get('/', (req, res) => res.sendFile(join(__dirname, 'index.html')));

io.on('connection', (socket) => {
    console.log("Utilisateur connecté au serveur");

    socket.emit('message', 'Bienvenue');

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté du serveur');
    });
});



const PORT = 4200;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));