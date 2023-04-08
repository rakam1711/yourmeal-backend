import { type Types } from 'mongoose'

export interface User {
  _id?: Types.ObjectId
  firstname: string
  lastname: string
  email: string
  phone: string
  orders: string[]
  address: string
}

export interface UserModel extends User {
  password: string

  verifyPassword: (candidatePassword: string) => Promise<boolean>
  getSignedToken: () => string
}
