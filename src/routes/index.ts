import express from 'express'
import authRouter from './auth.route'
import resturantRouter from './resturant.route'
import userRouter from './user.route'

import protect from '../middlewares/protect'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/resturant', resturantRouter)
router.use('/user', protect, userRouter)

export default router
