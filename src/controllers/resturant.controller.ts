import { type Request } from 'express'
import db from '../database'
import { type DataReturnType } from '../typings'

const { Resturants, MenuItems } = db

// Resturant Auth Funtions
export const loginResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const { email, password } = req.body

  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const resturant = await Resturants.findOne({ email })
    if (!resturant) {
      throw new Error('Resturant does not exists')
    }

    const isPasswordMatch = resturant.verifyPassword(password)
    if (!isPasswordMatch) {
      throw new Error('Email and Password do not match')
    }

    data.token = resturant.getSignedToken()
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

export const registerResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const {
    name,
    description,
    contacts,
    images,
    tags,
    address
  } = req.body

  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const resturant = await db.Resturants.create({
      name,
      description,
      contacts,
      images,
      tags,
      address
    })

    data.token = resturant.getSignedToken()
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

// Other Resturant Functions
export const resturantAddMenuItemController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data = {}
  const { hi } = req.body

  try {
    console.log(hi)
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}
