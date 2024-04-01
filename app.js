const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);

app.get('/views', function (req, res)  {
  res.send('accueil');
});

app.get('/views/channels', function (req, res) {
    res.send('bienvenue sur le channels');

});

app.post('/views/message', function (req, res) {
    res.send('envoi de message.')
})


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});


app.get((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = express;