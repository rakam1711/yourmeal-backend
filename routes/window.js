const express = require("express")
const windowRouter = express.Router()

windowRouter.get('/create',(req,res)=>{
  res.json({"name":"create page"}).status(200)
})

windowRouter.get('/join',(req,res)=>{
  res.json({"name":"join page"}).status(200)
})

windowRouter.get('/close',(req,res)=>{
  res.json({"name":"close page"}).status(200)
})


module.exports=windowRouter
