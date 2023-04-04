import { type Request } from 'express'
import db from '../database'
import { type DataReturnType } from '../typings'

// Resturant Auth Funtions

export const loginResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const {
    name,
    description,
    contacts,
    images,
    tags,
    address,
    menu
  } = req.body
  const errors: string[] = []
  const data = {}

  try {
    await db.Resturants.create({
      name,
      description,
      contacts,
      images,
      tags,
      address,
      menu
    })
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
  const errors: string[] = []
  const data = {}

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

// Other Resturant Functions
