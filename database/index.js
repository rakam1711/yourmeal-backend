const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['USER', 'CHEF'],
    default: 'USER',
    required: true
  },

  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders'
  }],

  address: {
    type: String,
    required: false
  }
})

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.verifyPassword = async function(candidatePassword){
  return bcrypt.compare(candidatePassword, this.password)
}

// Orders
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

const Users = mongoose.model('Users', userSchema)
const Orders = mongoose.model('Orders', orderSchema)

module.exports = {
  Users, Orders
}