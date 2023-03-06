const express = require("express");
const Users = require('../database')
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json({
    "success": true
  }).status(200);
});

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await Users.findOne({ username })
  res.json(user).status(200)
});

userRouter.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await Users.create({ username, password })

  res.json().status(200)
});

module.exports= userRouter