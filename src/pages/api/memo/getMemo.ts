import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from '@/types/api/interface'
import { prisma } from '@/lib/prisma'
import { RoleType } from '@/constant'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<any> | { message: string }>,
) => {
  if (req.method === 'GET') {
    try {
      const userId = req.headers['x-user'] as string

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          role: true,
        },
      })

      if (!user) {
        res.status(400).json({
          message: 'Bad Request',
        })
      }

      const roleAdmin: RoleType = 'ADMIN'
      const isAdmin = user?.role === roleAdmin

      const memos = await prisma.memo.findMany({
        where: isAdmin ? undefined : { userId: user?.id },
        orderBy: {
          createdAt: isAdmin ? 'desc' : 'asc',
        },
      })

      res.status(200).json({
        data: memos,
        status: { code: 1000, message: 'success' },
      })
    } catch (error: any) {
      res.status(500).json({
        message: 'Internal Error',
      })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

export default handler
