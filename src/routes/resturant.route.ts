import { Router } from 'express'
import {
  loginResturantController,
  registerResturantController,
  addMenuItemController,
  getResturantMenuController
} from '../controllers/resturant.controller'

import protect from '../middlewares/protect'

const resturantRouter = Router()

// Resturant auth routes
resturantRouter.post('/login', async (req, res) => {
  const response = await loginResturantController(req)
  res.json(response).status(200)
})

resturantRouter.post('/add', async (req, res) => {
  const response = await registerResturantController(req)
  res.json(response).status(200)
})

// Resturant feature routes
resturantRouter.post('/menu/add', async(req, res, next) => protect(req, res, next), async(req, res)=> {
  const response = await addMenuItemController(req)
  res.json(response).status(200)
})

resturantRouter.get('/:resturantid/menu', async (req, res) => {
  const response = await getResturantMenuController(req)
  res.json(response).status(200)
})
export default resturantRouter
