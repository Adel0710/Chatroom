import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import checkLoginData from "./controller/user/UserController";

const app = express();
const server = http.createServer(app);

const jsonParser = bodyParser.json();
const urlEncodeParser = bodyParser.urlencoded({extended : true})

app.use(jsonParser);
app.use(urlEncodeParser);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('views/index.html', {root: __dirname })
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/views/register.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});
app.get("/profil", function (req, res) {
  // res.sendFile(__dirname + "/views/profil.html");
  // console.log(req.session);
  
  // res.send(`Hello ${req}`)
});
app.post("/registerForm",function (req,res) {
  const username = req.body.username;
  const password = req.body.password;
})

app.post("/loginForm",function (req,res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    checkLoginData(username,password,res,req)
  } catch (error) {
    console.log(error);
    
  }
})


app.get('/channels', function (req, res) {
  res.send('bienvenue sur le channels');
});

app.post('/message', function (req, res) {
  // res.send('envoi de message.')
  res.sendFile(__dirname + "/views/message.html");
})


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});




module.exports = express;

