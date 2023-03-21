import db from '../database'
import { type DataReturnType, type Request } from '../typings'

const { Users, Orders } = db

// Auth functions

export const loginController = async (req: Request): Promise<DataReturnType<{ token: string }>> => {
  const { email, password } = req.body
  const errors: any = {}
  const data: any = {}

  block: try {
    const user = await Users.findOne({ email })
    if (!user) {
      errors.message = 'User not found'
      break block
    }

    const isMatch = await user.verifyPassword(password)
    if (!isMatch) {
      errors.message = 'Email and Password do not match'
      break block
    }

    const token = user.getSignedToken()
    if (!token) {
      errors.message = 'Unable to login the user. Please contact the server admin'
      break block
    }

    data.token = token
  } catch (error) {
    errors.message = error
    console.log(error)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const registerController = async (req: Request): Promise<DataReturnType<{ token: string }>> => {
  const { email, password, firstname, lastname, phone } = req.body
  const errors: any = {}
  const data: any = {}

  block: try {
    const checkUserExists = await Users.findOne({ email })

    if (checkUserExists) {
      errors.message = 'Email already in use'
      break block
    }

    const user = await Users.create({ email, password, firstname, lastname, phone })

    const token = user.getSignedToken()
    data.token = token
  } catch (error) {
    errors.message = error
    console.error(error)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

// Other functions

export const newOrderController = async (req: Request): Promise<DataReturnType<any>> => {
  const { order } = req.body
  const errors: any = {}
  const data: any = {}

  try {
    const newOrder = await Orders.create({ ...order, user: req.user })
    if (!newOrder) {
      errors.message = 'Unable to place the order. Please try later'
    }
  } catch (error) {
    errors.message = error
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const userOrdersController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: any = {}
  const data: any = {}

  try {
    const orders = await Orders.find({ user: req.user })
    data.orders = orders
  } catch (error) {
    errors.message = error
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const addressController = async (req: Request): Promise<DataReturnType<any>> => {
  const { address } = req.body
  const errors: any = {}
  const data: any = {}

  try {
    const user = await Users.findByIdAndUpdate(req.user, { address })
    if (!user) {
      errors.message = 'User not found. Invalid token'
    }
  } catch (error) {
    errors.message = error
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}
