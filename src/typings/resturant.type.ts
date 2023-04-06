export interface ResturantType {
  name: string
  description: string
  contacts: {
    emails: string[]
    phones: string[]
  }
  image: string
  tags: string[]
  address: string
}

export interface ResturantModel extends ResturantType {
  email: string
  password: string

  
  verifyPassword: (candidatePassword: string) => Promise<boolean>
  getSignedToken: () => string
}

export interface MenuItemType {
  name: string
  thumbnail: string
  price: string
  quantity: string
  tags: string[]
}
