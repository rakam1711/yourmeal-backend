import db from '../database'
import { type DataReturnType, type Request } from '../typings'

const { Resturants, MenuItems } = db

// Resturant Auth Funtions
export const loginResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const { email, password } = req.body
  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const resturant = await db.Resturants.findOne({ email })

    data.token = resturant?.getSignedToken()
  } catch (error) {
    errors.push(error as string)
    console.log(error)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

export const registerResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const {
    name,
    email,
    password,
    description,
    contacts,
    image,
    tags,
    address
  } = req.body

  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const resturant = await db.Resturants.create({
      name,
      email,
      password,
      description,
      contacts,
      image,
      tags,
      address
    })

    data.token = resturant.getSignedToken()
  } catch (error) {
    errors.push(error as string)
    console.log(error)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

// Other Resturant Functions
export const addMenuItemController = async (req: Request): Promise<DataReturnType<any>> => {
  const {
    name,
    description,
    thumbnail,
    price,
    quantity,
    category,
    tags
  } = req.body

  const errors: string[] = []
  const data: { item?: any } = {}

  try {
    const item = await db.MenuItems.create({
      resturant: req.resturant,
      name,
      description,
      thumbnail,
      price,
      quantity,
      category,
      tags
    })

    console.log(item)

    data.item = item
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

export const getResturantMenuController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data: { items?: any[] } = {}

  try {
    const items = await db.MenuItems.find({ resturant: req.params.resturantid })
    data.items = items
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}
