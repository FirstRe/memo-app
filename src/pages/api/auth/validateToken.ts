import type { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { ResponseData } from '@/types/api/interface'

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<any> | { message: string }>,
) => {
  if (req.method === 'POST') {
    try {
      const authorizationHeader = req.headers['authorization']

      if (!authorizationHeader) {
        res.status(401).json({ message: 'Unauthorized' })
      }

      const accessToken = authorizationHeader?.replace('Bearer ', '') ?? ''

      const verifyToken = jwt.verify(accessToken, 'skey_test_memo')

      res.status(200).json({
        data: verifyToken,
        status: {
          code: 1000,
          message: '',
        },
      })
    } catch (error) {
      res.status(401).json({
        message: 'Unauthorized',
      })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

export default handler
