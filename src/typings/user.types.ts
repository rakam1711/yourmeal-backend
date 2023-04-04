export interface User {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  orders: string[]
  address: string
}

export interface UserModel extends User {
  verifyPassword: (candidatePassword: string) => Promise<boolean>
  getSignedToken: () => string
}
