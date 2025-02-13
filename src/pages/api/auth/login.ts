import type { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { IUser, repos } from '@/utils/mock'
import { ResponseData } from '@/types/api/interface'
import { LoginResponse } from '@/types/api/auth/interfact'
import { prisma } from '@/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<LoginResponse> | { message: string }>,
) => {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body

      const { token, user } = await login(username, password)

      res.status(200).json({
        data: { token, user },
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

const login = async (name: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: name,
    },
  })


  if (!user) {
    throw new Error('พาสเวิร์ดไม่ถูกต้อง')
  }

  if (password !== user.password) {
    throw new Error('พาสเวิร์ดไม่ถูกต้อง')
  }

  return {
    token: getToken(user),
    user: {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
    },
  }
}

const getToken = (user: IUser): string => {
  const payload = {
    id: user.id,
    name: user.username,
    email: user.email,
    role: user.role,
  }
  return jwt.sign(payload, `${process.env.SECRET_KEY}`)
}

export default handler
