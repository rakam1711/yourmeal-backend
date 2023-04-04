import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String,
    required: false
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: String,
    enum: ['Count', 'Bowl', 'Weight', 'Volume'],
    required: true
  },

  tags: {
    type: [String]
  }
})

const MenuItems = mongoose.model('MenuItems', menuItemSchema)
export default MenuItems
