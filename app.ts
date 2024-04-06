import express from "express";
import http, { request } from "http";
import bodyParser from "body-parser";
// import { db } from "./db";
//cimport { pool } from "./model/dbConnect";
import expressionSession, { SessionData } from "express-session";
import { RowDataPacket } from "mysql2";
import checkLoginData from "./controller/user/UserController";
import registerController from "./controller/user/RegisterController"
import { error } from "console";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize()

const jsonParser = bodyParser.json();
const urlEncodeParser = bodyParser.urlencoded({ extended: true });

app.use(jsonParser);
app.use(urlEncodeParser);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile("views/index.html", { root: __dirname });
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/views/register.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");

app.post("/registerForm", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstNname;
    const lastName = req.body.lastName;
    const email = req.body.email;
    if (username && password && firstName && lastName && email) {
      console.log("good1");
      registerController(username, password, firstName, lastName, email, res);
    } else {
      console.log("username or password missing");
      res.send("username or password is missing");
    }
  });
});
app.get("/profil", function (req, res) {
  // res.sendFile(__dirname + "/views/profil.html");
  // console.log(req.session);
  // res.send(`Hello ${req}`)
});
app.post("/registerForm", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
});

app.post("/loginForm", function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    checkLoginData(username, password, res);
  } catch (error) {
    console.log(error);
  }
});

app.get("/channels", function (req, res) {
  res.send("bienvenue sur le channels");
});

app.get("/message", function (req, res) {
  // res.send('envoi de message.')
  res.sendFile(__dirname + "/views/message.html");
});

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

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
