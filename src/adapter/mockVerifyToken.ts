import { secretKey } from '@/constant'
import { stat } from 'fs'
import * as jwt from 'jsonwebtoken'

export const mockVerifyToken = (token: string) => {
  try {
    jwt.verify(token, secretKey)
    return { status: 200 }
  } catch (error) {
    return { status: 401 }
  }
}
