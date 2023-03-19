import db from '../database'
import { type DataReturnType } from '../typings'

const { Users, Orders } = db

export const orderController = async (req: any): Promise<DataReturnType<any>> => {
  const { order } = req.body
  const errors: any = {}
  const data: any = {}

  try {
    const newOrder = await Orders.create({ ...order, user: req.user })
    if (!newOrder) {
      errors.message = 'Unable to place the order. Please try later'
    }
    await Users.findByIdAndUpdate(req.user, {
      $push: { orders: newOrder._id }
    })
  } catch (error) {
    errors.message = error
  }

  return {
    success: Object.keys(errors).length < 1,
    errors,
    data
  }
}

export const userOrdersController = async (req: any): Promise<DataReturnType<any>> => {
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

export const addressController = async (req: any): Promise<DataReturnType<any>> => {
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
