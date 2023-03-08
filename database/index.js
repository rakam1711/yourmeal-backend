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
  }
})

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.verifyPassword = async function(candidatePassword){
  return bcrypt.compare(candidatePassword, this.password)
}

const Users = mongoose.model('Users', userSchema)

// Window

const windowSchema = new mongoose.Schema({
  user: [{
    type:mongoose.Types.ObjectId,
    unique: true,
    required: true
  }]
})

const WindowInstance = mongoose.model('WindowInstance', windowSchema)

module.exports = Users
