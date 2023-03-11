const express = require("express");
const authRouter = require("./auth")
const userRouter = require("./user")

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/secrets', () => {
  if (req.isAuthenticated) {
    res.render('secrets')
  } else {
    res.render('login')
  }
})

router.use('/auth', authRouter)
router.use('/user', userRouter)

module.exports = router
