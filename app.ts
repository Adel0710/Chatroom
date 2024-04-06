import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import checkLoginData from "./controller/user/UserController";
import registerController from "./controller/user/RegisterController";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

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
});
app.post("/registerForm",function (req,res) {  
  console.log('good0');
  
  const username = req.body.username;  
  console.log(username);
  
  const password = req.body.password;  
  console.log(password);
  
  const firstName = req.body.firstNname; 
  console.log(firstName);
   
  const lastName = req.body.lastName;  
  console.log(lastName);
  
  const email = req.body.email;  
  console.log(email);
  
  if (username && password && firstName && lastName && email) {
    console.log('good1');
    registerController(username ,password ,firstName ,lastName ,email,res);
  }else {
    console.log("username or password missing");
    res.send("username or password is missing");
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

app.get('/message', function (req, res) {
  // res.send('envoi de message.')
  res.sendFile(__dirname + "/views/message.html");
})
//  socket.io chat by adel
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});


httpServer.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});




module.exports = express;

