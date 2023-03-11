const express = require("express")
const bcrypt = require('bcrypt')
const { Users, Orders } = require('../database')
const userRouter = express.Router()

const user = "640c32c9826b95b4e6a6ac5e"

userRouter.post('/order', async (req, res) => {
  const { order } = req.body
 
  const newOrder = await Orders.create({ ...order, user })

  await Users.findByIdAndUpdate(user, {
    $push: { orders: newOrder._id }
  })
  
  res.json({
    "success": true
  }).status(200)
})

userRouter.get('/order', async (req, res) => {
  const orders = await Orders.find({ user })

  res.json(orders).status(200)
})

userRouter.post('/address', async (req, res) => {
  const { address } = req.body

  await Users.findByIdAndUpdate(user, { address })

  res.json({ success: true }).status(200)
})

module.exports = userRouter