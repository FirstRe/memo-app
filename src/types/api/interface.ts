export interface ResponseData<T> {
  data: T | null
  status: {
    code: number
    message: string
  }
}
