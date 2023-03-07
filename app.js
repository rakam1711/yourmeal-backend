const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const ejs = require("ejs");
require('dotenv').config();

const router = require("./routes");

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }))

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/test/"

mongoose.connect(DATABASE_URL).then(() => console.log('connection established'));

app.use("/", router);

const server = http.createServer(app);

server.listen("3000",() => {
  console.log("server established");
})