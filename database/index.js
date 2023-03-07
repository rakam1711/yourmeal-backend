const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
  }
})

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const Users = mongoose.model('Users', userSchema)

const windowSchema = new mongoose.Schema({
  user: [{
    type:mongoose.Types.ObjectId,
    unique: true,
    required: true
  }]
})
const WindowInstance = mongoose.model('WindowInstance', windowSchema)

module.exports = Users
