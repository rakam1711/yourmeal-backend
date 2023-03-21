import { type Request } from 'express'
import { type DataReturnType } from '../typings'

// Resturant Auth Funtions

export const loginResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const { name } = req.body
  const errors = {}
  const data = {}

  try {
    console.log(name)
  } catch (error) {
    console.log(error)
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const registerResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors = {}
  const data = {}

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

// Other Resturant Functions
