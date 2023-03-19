import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test123'

interface UserModel {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  orders: string[]
  address: string

  verifyPassword: (candidatePassword: string) => Promise<boolean>
  getSignedToken: () => string
}

const userSchema = new mongoose.Schema<UserModel>({
  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orders'
    }
  ],

  address: {
    type: String,
    required: false
  }
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.verifyPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ userid: this._id }, JWT_SECRET_KEY, {
    expiresIn: '3d'
  })
}

const Users = mongoose.model('Users', userSchema)

export default Users
