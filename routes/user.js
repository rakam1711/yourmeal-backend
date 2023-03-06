const express = require("express");
const userRouter =express.Router();
const users = [
  {
    username:"rakam",
    password:"12345"
  },
  {
    username:'gitesh',
    password:'12345'
  }
]

userRouter.get('/user',(req,res)=>{
  res.json({"name":"gitesh"}).status(200);
});


userRouter.get('/login',(req,res)=>{
  const {username,password}=req.body
  const selectedUser = users.find((user)=>
    user.username === "rakam"

  )
  console.log(selectedUser);
});
userRouter.get('/register',(req,res)=>{
  console.log("login");
});

module.exports= userRouter
