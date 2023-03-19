export interface ResturantType {
  name: string
  description: string
  images: string[]
  tags: string[]
  address: string
  menu: MenuItemType[]
}

export interface MenuItemType {
  name: string
  thumbnail: string
  price: string
  quantity: string
}
