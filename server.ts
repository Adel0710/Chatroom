const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 8001);

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

server.listen(process.env.PORT || 8001);
