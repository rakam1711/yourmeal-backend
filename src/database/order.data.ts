import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  items: [{
    type: String,
    required: true
  }],

  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users'
  }
})

const Orders = mongoose.model('Orders', orderSchema)

export default Orders