import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import type { UserModel } from '../typings/user.types'
import { JWT_SECRET_KEY } from '../configs/constants'

const userSchema = new mongoose.Schema<UserModel>({
  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    select: false
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
  return jwt.sign({ userid: this._id, role: 'user' }, JWT_SECRET_KEY, {
    expiresIn: '3d'
  })
}

const Users = mongoose.model('Users', userSchema)

export default Users
