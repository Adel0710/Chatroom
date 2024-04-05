import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import checkLoginData from "./controller/user/UserController";
import registerController from "./controller/user/RegisterController";

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
  res.sendFile(__dirname + "/views/profil.html");
  // console.log(req.session);
  
  // res.send(`Hello ${req}`)
  // const sessionData = req.session;
});
app.post("/registerForm",function (req,res) {  
  const username = req.body.username;  
  const password = req.body.password;  
  const firstName = req.body.firstNname;  
  const lastName = req.body.lastName;  
  const email = req.body.email;  
  if (username && password && firstName && lastName && email) {
    console.log('good1');
    registerController(username ,password ,firstName ,lastName ,email,res);
  }
})

app.post("/loginForm",function (req,res) {
  // console.log(req);
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    checkLoginData(username,password,res);
  }
})


app.get('/channels', function (req, res) {
  res.send('bienvenue sur le channels');
});

app.post('/message', function (req, res) {
  // res.send('envoi de message.')
  res.sendFile(__dirname + "/views/message.html");
})


server.listen(8081, () => {
  console.log('server running at http://localhost:8081');
});




module.exports = express;

