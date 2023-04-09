import { type Request, type DataReturnType } from '../typings'
import db from '../database'
import { type OrderModel } from '../typings/order.type'

export const addOrderController = async (req: Request): Promise<DataReturnType<{ order?: OrderModel }>> => {
  const errors: string[] = []
  const data: { order?: OrderModel } = {}

  const {
    resturant,
    items,
    paymentMethod,
    paid
  } = req.body

  const randomDate = (start: number, end: number): Date => {
    return new Date(start + Math.random() * (end - start))
  }

  const calculateTotal = (items: any[]): number => {
    let total = 0
    items.forEach(item => {
      total = total + Number(item.total)
    })

    return total
  }

  try {
    const order = await db.Orders.create({
      user: req.user,
      resturant,
      items,
      estimatedDeliveryTime: randomDate(Date.now(), Date.now()),
      total: calculateTotal(items),
      paymentMethod,
      paid
    })

    data.order = order
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

export const updateOrderController = async (req: Request): Promise<DataReturnType<{ order?: OrderModel }>> => {
  const errors: string[] = []
  const data: { order?: OrderModel } = {}
  const { userorder } = req.body

  try {
    const order = await db.Orders.findByIdAndUpdate(req.params.orderid, userorder)
    if (!order) {
      throw new Error('Order does not exist')
    }

    data.order = order
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}

export const deleteOrderController = async (req: Request): Promise<DataReturnType<any>> => {
  const errors: string[] = []
  const data = {}

  try {
    await db.Orders.findByIdAndDelete(req.params.orderid)
  } catch (error) {
    errors.push(error as string)
  }

  return {
    success: errors.length < 1,
    errors,
    data
  }
}
