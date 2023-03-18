const express = require("express")
const bcrypt = require('bcrypt')
const { Users, Orders } = require('../database')
const userRouter = express.Router()


userRouter.post('/order', async (req, res) => {
  const { order } = req.body

  console.log(order, req.user)
  const newOrder = await Orders.create({ ...order, user: req.user })

  await Users.findByIdAndUpdate(req.user, {
    $push: { orders: newOrder._id }
  })
  
  res.json({ "success": true }).status(200)
})

userRouter.get('/order', async (req, res) => {
  const orders = await Orders.find({ user: req.user })

  res.json(orders).status(200)
})

userRouter.post('/address', async (req, res) => {
  const { address } = req.body

  await Users.findByIdAndUpdate(req.user, { address })

  res.json({ success: true }).status(200)
})

module.exports = userRouter

console.log()