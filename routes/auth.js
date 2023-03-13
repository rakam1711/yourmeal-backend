const express = require("express")
const {Users} = require('../database')
const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  res.json({
    "success": true
  }).status(200)
})

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Users.findOne({ username })
    if(!user){
      res.json({ "success": false, "message": "User not found" }).status(200)
    return
    }
    const isMatch = await user.verifyPassword(password)
    if(!isMatch) {
      res.json({ "success": false, "message": "Username and Password do not match" }).status(200)
    return
    }
    const token = user.getSignedToken()
    res.json({ success: true, token }).status(200)
  } catch(error) {
    console.log(error)
  }
})

userRouter.post('/register', async (req, res) => {
  const { username, password, role } = req.body
  try {
    const checkUserExists = await Users.findOne({ username })
    if(checkUserExists) {
      res.json({ success: false, message: "Username already in use" })
      return
    }
    const user = await Users.create({ username, password,role })
    res.json({ success: true }).status(200)
  } catch (error) {
    console.error(error)
  }
})

module.exports = userRouter
