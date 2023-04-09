import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resturants',
    required: true
  },

  name: {
    type: String,
    required: true
  },

  description: {
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

  category: {
    type: String,
    enum: ['Starter', 'Main Course', 'Salad', 'Dessert', 'Drinks', 'Special', 'Others'],
    required: true
  },

  tags: {
    type: [String],
    required: true
  }
})

const MenuItems = mongoose.model('MenuItems', menuItemSchema)
export default MenuItems
