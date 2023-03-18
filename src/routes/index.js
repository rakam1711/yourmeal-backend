const express = require("express");
const authRouter = require("./auth.route")
const resturantRouter = require("./resturant");
const userRouter = require("./user")

const protect = require('../middlewares/protect');

const router = express.Router();

router.use('/auth', authRouter)
router.use('/resturant', resturantRouter)
router.use('/user', protect, userRouter)

module.exports = router
