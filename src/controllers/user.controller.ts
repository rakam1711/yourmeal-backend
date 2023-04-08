import db from '../database'
import { type DataReturnType, type Request } from '../typings'

const { Users, Orders } = db

// Auth functions
// Login Controller Function
export const loginController = async (req: Request): Promise<DataReturnType<{ token?: string }>> => {
  const { email, password } = req.body
  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const user = await Users.findOne({ email })
    if (!user) {
      throw new Error('User not found')
    }

    const isMatch = await user.verifyPassword(password)
    if (!isMatch) {
      throw new Error('Email and Password do not match')
    }

    const token = user.getSignedToken()
    if (!token) {
      throw new Error('Unable to login the user. Please contact the server admin')
    }

    data.token = token
  } catch (error) {
    errors.push(error as string)
    console.log(error)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

// Register Controller Functions
export const registerController = async (req: Request): Promise<DataReturnType<{ token?: string }>> => {
  const { email, password, firstname, lastname, phone } = req.body
  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const checkEmailExists = await Users.findOne({ email })
    if (checkEmailExists) {
      throw new Error('Email already in use')
    }

    const checkPhoneExists = await Users.findOne({ phone })
    if (checkPhoneExists) {
      throw new Error('Phone number already in use')
    }

    const user = await Users.create({ email, password, firstname, lastname, phone })

    const token = user.getSignedToken()
    data.token = token
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

// Other functions
export const newOrderController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data: any = {}

  // TODO: Add implementation

  // try {
  //   const newOrder = await Orders.create({ ...order, user: req.user })
  //   if (!newOrder) {
  //     errors.message = 'Unable to place the order. Please try later'
  //   }
  // } catch (error) {
  //   errors.message = error
  // }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const userOrdersController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data: any = {}

  try {
    const orders = await Orders.find({ user: req.user })
    data.orders = orders
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const addressController = async (req: Request): Promise<DataReturnType<any>> => {
  const { address } = req.body
  const errors: string[] = []
  const data: any = {}

  try {
    const user = await Users.findByIdAndUpdate(req.user, { address })
    if (!user) {
      throw new Error('User not found')
    }
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}