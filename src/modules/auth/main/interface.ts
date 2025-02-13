export interface IMemo {
  id: string
  memo: string
  userId: string
  index: number
  user: {
    role: string
  }
  isNew: boolean
}

export interface IMemoForm {
  memo: IMemo[]
}
