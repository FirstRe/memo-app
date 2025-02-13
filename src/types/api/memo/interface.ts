export interface IMemo {
  id: string
  memo: string
  userId: string
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

export interface IMemoRequest {
  id?: string
  memo: string
}
