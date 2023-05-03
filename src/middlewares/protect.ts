import db from '../database'
import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../configs/constants'

const protect = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      res.json({
        success: false,
        errors: { message: 'User not logged in' },
        data: {}
      }).status(404)
      return
    }

    const token = authorization.split(' ')[1]
    const data: any = jwt.verify(token, JWT_SECRET_KEY)

    if (data.role === 'user') {
      const user = await db.Users.findById(data?.userid)
      if (!user) {
        res.json({ success: false, message: 'User does not exist ' }).status(404)
      }
      req.user = data.userid
    }

    if (data.role === 'resturant') {
      const resturant = await db.Resturants.findById(data?.resturantid)
      if (!resturant) {
        res.json({ success: false, message: 'Resturant does not exist ' }).status(404)
      }
      req.resturant = data.resturantid
    }
    next()
  } catch (error) {
    console.error(error)
  }
}

export default protect
