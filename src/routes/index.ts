import express from 'express'

import resturantRouter from './resturant.route'
import userRouter from './user.route'
import orderRouter from './order.route'

const router = express.Router()

router.use('/user', userRouter)
router.use('/resturant', resturantRouter)
router.use('/order', orderRouter)

export default router
