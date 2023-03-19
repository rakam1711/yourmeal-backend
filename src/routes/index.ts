import express from 'express'

import resturantRouter from './resturant.route'
import userRouter from './user.route'

const router = express.Router()

router.use('/user', userRouter)
router.use('/resturant', resturantRouter)

export default router
