import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItems',
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  total: {
    type: Number,
    required: true
  }
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },

  resturant: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Resturants',
    required: true
  },

  items: {
    type: [orderItemSchema],
    required: true
  },

  placedTime: {
    type: Date,
    required: true,
    default: Date.now()
  },

  estimatedDeliveryTime: {
    type: Date,
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ['COD', 'Credit/Debit Card', 'Net Banking', 'UPI'],
    default: 'COD',
    required: true
  },

  paid: {
    type: Boolean,
    default: false,
    required: true
  },

  delivered: {
    type: Boolean,
    default: false,
    required: true
  },

  deliveryTime: {
    type: Date,
    required: false
  }
})

const Orders = mongoose.model('Orders', orderSchema)

export default Orders
