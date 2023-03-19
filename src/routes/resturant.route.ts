import  { Router } from 'express'
const resturantRouter = Router()

resturantRouter.get('/', (req, res) => {
  const resturants:any = []
  res.json({ success:true, resturants }).status(200)
})

resturantRouter.get('/:id', (req, res) => {
  const resturant = {}
  res.json({ success: true, resturant }).status(200)
})

export default resturantRouter