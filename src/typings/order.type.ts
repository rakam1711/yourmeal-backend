import { type Document, type Types } from 'mongoose'

export type PaymentMethods = 'COD' | 'Credit/Debit Card' | 'Net Banking' | 'UPI'

export interface OrderItem {
  item: Types.ObjectId
  quantity: number
  total: number
}

export interface Order {
  user: Types.ObjectId
  resturant: Types.ObjectId
  items: OrderItem[]
  placedTime: Date
  estimatedDeliveryTime: Date
  total: number
  paymentMethod: PaymentMethods
  paid: boolean
  delivered: boolean
  deliveryTime?: Date
}

export interface OrderItemModel extends OrderItem, Document {}
export interface OrderModel extends Order, Document {
  items: OrderItemModel[]
}
