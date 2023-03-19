import { Router } from 'express'
import {
  loginResturantController,
  registerResturantController
} from '../controllers/resturant.controller'

const resturantRouter = Router()

// Resturant auth routes
resturantRouter.post('/login', async (req, res) => {
  const response = await loginResturantController(req)
  res.json(response).status(200)
})

resturantRouter.post('/register', async (req, res) => {
  const response = await registerResturantController(req)
  res.json(response).status(200)
})

// Resturant feature routes

export default resturantRouter
