import { type Request as Req } from 'express'
export interface Request extends Req {
  user?: string
}

export interface DataReturnType<T> {
  success: boolean
  errors: string[]
  data: T
}
