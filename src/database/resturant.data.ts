import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import type { ResturantModel } from '../typings/resturant.type'
import { JWT_SECRET_KEY } from '../configs/constants'

const resturantSchema = new mongoose.Schema<ResturantModel>({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    select: false
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  description: {
    type: String,
    required: true
  },

  contacts: {
    type: {
      emails: {
        type: [String],
        required: true
      },
      phones: {
        type: [String],
        required: true
      }
    },
    require: true
  },

  image: {
    type: String,
    require: true
  },

  tags: {
    type: [String],
    require: true
  },

  address: {
    type: String,
    require: true
  }
})

resturantSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

resturantSchema.methods.verifyPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password)
}

resturantSchema.methods.getSignedToken = function () {
  return jwt.sign({ resturantid: this._id, role: 'resturant' }, JWT_SECRET_KEY, {
    expiresIn: '3d'
  })
}

const Resturants = mongoose.model('Resturants', resturantSchema)
export default Resturants
