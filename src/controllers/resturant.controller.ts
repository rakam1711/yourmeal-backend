import db from '../database'
import type { DataReturnType, Request } from '../typings'

// Resturant Auth Funtions
export const loginResturantController = async (req: Request): Promise<DataReturnType<any>> => {
  const { email, password } = req.body
  const errors: string[] = []
  const data: { token?: string } = {}

  try {
    const resturant = await db.Resturants.findOne({ email })

    if (!resturant) {
      throw new Error('Resturant does not exist')
    }

    const isPasswordMatch = resturant.verifyPassword(password)

    if (!isPasswordMatch) {
      throw new Error('Email and Password do not match')
    }
    const token = resturant.getSignedToken()
    if (!token) {
      throw new Error('Unable to login')
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
    const doesEmailExists = await db.Resturants.findOne({ email })
    if (!doesEmailExists) {
      throw new Error('Email already in use')
    }

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

    const token = resturant.getSignedToken()

    if (!token) {
      throw new Error('Unable to login')
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

// Other Resturant Functions

export const getResturantMenuController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data: { items?: any[] } = {}

  try {
    const items = await db.MenuItems.find({ resturant: req.params.resturantid })
    data.items = items
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

export const removeMenuItemController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data = {}

  try {
    await db.MenuItems.findByIdAndDelete(req.params.itemid)
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

export const updateMenuItemController = async (req: Request): Promise<DataReturnType<any>> => {
  const { menuitem } = req.body
  const errors: string[] = []
  const data: { item?: any } = {}

  try {
    const item = await db.MenuItems.findByIdAndUpdate(req.params.itemid, menuitem)
    data.item = item
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
