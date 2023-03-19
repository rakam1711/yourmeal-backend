export interface DataReturnType<T> {
  success: boolean
  errors: {
    messsage: string
  }
  data: T
}
