const { Router } = require('express')
const resturantRouter = Router()

resturantRouter.get('/', (req, res) => {
  const resturants = []
  res.json({ success:true, resturants }).status(200)
})

resturantRouter.get('/:id', (req, res) => {
  const resturant = {}
  res.json({ success: true, resturant }).status(200)
})

module.exports = resturantRouter