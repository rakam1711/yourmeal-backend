const express = require("express")
const { loginController, registerController } = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
  const response = await loginController(req)
  res.json(response).status(200)
})

authRouter.post('/register', async (req, res) => {
  const response = await registerController(req)
  res.json(response).status(200)
})

module.exports = authRouter