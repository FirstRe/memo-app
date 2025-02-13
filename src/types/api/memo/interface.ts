export interface IMemoResponse {
  id: string
  memo: string
  index: number
  userId: string
  user: {
    createdAt: string
    createdBy: string
    email: string
    id: string
    password: string
    role: string
    updatedAt: string
    updatedBy: string
    username: string
  }
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

export interface IMemoRequest {
  id?: string
  memo: string
  index: number
}
