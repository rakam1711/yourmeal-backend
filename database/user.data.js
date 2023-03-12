const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = "rakamSinghIsOP"

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

userSchema.methods.getSignedToken = function() {
  return jwt.sign({ userid: this._id, role: this.role }, SECRET_KEY, { expiresIn: '3d' })
}

const Users = mongoose.model('Users', userSchema)

module.exports = Users