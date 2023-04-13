import db from '../database'
import type { DataReturnType, Request } from '../typings'

const { Users } = db

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
      throw new Error('Unable to login the user')
    }

    data.token = token
  } catch (error: any) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
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
  } catch (error: any) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

// Other functions
export const addressController = async (req: Request): Promise<DataReturnType<any>> => {
  const { address } = req.body
  const errors: string[] = []
  const data: any = {}

  try {
    const user = await Users.findByIdAndUpdate(req.user, { address })
    if (!user) {
      throw new Error('User not found')
    }
  } catch (error: any) {
    if (typeof error === typeof new Error('')) {
      errors.push(error.message)
    } else {
      errors.push(String(error))
    }
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}
