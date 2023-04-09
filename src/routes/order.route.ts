import { Router } from 'express'
import protect from '../middlewares/protect'

const orderRouter = Router()

orderRouter.post('/add', async (req, res, next) => {
  await protect(req, res, next)
})

orderRouter.post('/:orderid/update', async (req, res, next) => {
  await protect(req, res, next)
})

orderRouter.post('/:orderid/delete', async (req, res, next) => {
  await protect(req, res, next)
})

export default orderRouter
