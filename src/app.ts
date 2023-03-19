import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import router from './routes'

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/test"


mongoose.connect(DATABASE_URL).then(() => console.log('connection established'));

app.use("/", router);

const server = http.createServer(app);

server.listen("3000",() => {
  console.log("server established");
})
