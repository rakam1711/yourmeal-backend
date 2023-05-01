import { Router } from 'express'
import {
  loginResturantController,
  registerResturantController,
  validateResturant,
  addMenuItemController,
  getResturantMenuController,
  removeMenuItemController,
  updateMenuItemController
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
resturantRouter.get(
  '/validate',
  async (req, res, next) => {
    await protect(req, res, next)
  },
  async (req, res) => {
    const response = await validateResturant(req)
    res.json(response).status(200)
  }
)

resturantRouter.get('/:resturantid/menu', async (req, res) => {
  const response = await getResturantMenuController(req)
  res.json(response).status(200)
})

resturantRouter.post(
  '/menu/add',
  async (req, res, next) => {
    await protect(req, res, next)
  },
  async (req, res) => {
    const response = await addMenuItemController(req)
    res.json(response).status(200)
  }
)

resturantRouter.post(
  '/menu/:itemid/delete',
  async (req, res, next) => {
    await protect(req, res, next)
  },
  async (req, res) => {
    const response = await removeMenuItemController(req)
    res.json(response).status(200)
  }
)

resturantRouter.post(
  '/menu/:itemid/update',
  async (req, res, next) => {
    await protect(req, res, next)
  },
  async (req, res) => {
    const response = await updateMenuItemController(req)
    res.json(response).status(200)
  }
)

export default resturantRouter
