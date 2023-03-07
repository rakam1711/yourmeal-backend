const express = require("express");
const bcrypt = require('bcrypt')
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

      if(user){
        bcrypt.compare(password , user.password , function(err, result) {
              if(result === true){
                res.render("secrets");
              }
              })
        }

});


userRouter.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await Users.create({ username, password })

  res.json().status(200)
});

module.exports= userRouter
