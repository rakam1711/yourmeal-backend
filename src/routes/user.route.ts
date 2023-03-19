import express from 'express'
import {
  addressController,
  orderController,
  userOrdersController
} from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.post('/order', async (req, res) => {
  const response = await orderController(req)
  res.json(response).status(200)
})

userRouter.get('/orders', async (req, res) => {
  const response = await userOrdersController(req)
  res.json(response).status(200)
})

userRouter.post('/address', async (req, res) => {
  const response = await addressController(res)
  res.json(response).status(200)
})

export default userRouter
