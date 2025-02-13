import type { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { IUser, repos } from '@/utils/mock'
import { ResponseData } from '@/types/api/interface'
import { LoginResponse } from '@/types/api/auth/interfact'

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<LoginResponse> | { message: string }>,
) => {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body

      const token = login(username, password)

      res.status(200).json({
        data: { token: token },
        status: { message: '', code: 1000 },
      })
    } catch (error: any) {
      res.status(200).json({
        data: null,
        status: { message: error.message, code: 9999 },
      })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

const login = (name: string, password: string): string => {
  const user = repos.users.find((e) => e.name === name)
  if (!user) {
    throw new Error('พาสเวิร์ดไม่ถูกต้อง')
  }

  if (password !== user.password) {
    throw new Error('พาสเวิร์ดไม่ถูกต้อง')
  }

  return getToken(user)
}

const getToken = (user: IUser): string => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
  return jwt.sign(payload, `${process.env.SECRET_KEY}`)
}

export default handler
