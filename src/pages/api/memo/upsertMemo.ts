import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from '@/types/api/interface'
import { prisma } from '@/lib/prisma'
import { IMemoRequest } from '@/types/api/memo/interface'
import { uuid } from 'uuidv4'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<any> | { message: string }>,
) => {
  if (req.method === 'POST') {
    try {
      const userId = req.headers['user-id'] as string
      const { id, memo, index } = req.body as IMemoRequest

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
        },
      })

      if (!user) {
        res.status(400).json({
          message: 'Bad Request',
        })
      } else {
        const createMemo = await prisma.memo.upsert({
          where: {
            id: id || uuid(),
          },
          create: {
            memo,
            index,
            createdBy: user.username,
            updatedBy: user.username,
            userId: user.id,
          },
          update: {
            id,
            memo,
            createdBy: user.username,
            updatedBy: user.username,
            userId: user.id,
          },
          select: {
            id: true,
          },
        })

        res.status(200).json({
          data: {
            id: createMemo.id,
          },
          status: { code: 1000, message: 'success' },
        })
      }
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
