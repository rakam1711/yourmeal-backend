const { Users, Orders } = require('../database')

const orderController = async (req) => {
  const { order } = req.body
  const errors = {}
  const data = {}

  try {
    const newOrder = await Orders.create({ ...order, user: req.user })
    if(!newOrder) {
      errors.message = "Unable to place the order. Please try later"
    }
    await Users.findByIdAndUpdate(req.user, {
      $push: { orders: newOrder._id }
    })
  } catch(error) {
    errors.message = error
  } finally {
    return {
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}

const userOrdersController = async (req) => {
  const errors = {}
  const data = {}

  try {
    const orders = await Orders.find({ user: req.user })
    data.orders = orders
  } catch (error) {
    errors.message = error
  } finally {
    return {
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}

const addressController = async (req) => {
  const { address } = req.body
  const errors = {}
  const data = {}

  try {
    const user = await Users.findByIdAndUpdate(req.user, { address })
    if(!user) {
      errors.message = "User not found. Invalid token"
    }
  } catch (error) {
    errors.message = error
  } finally {
    return {
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}

module.exports = {
  addressController,
  userOrdersController,
  orderController
}