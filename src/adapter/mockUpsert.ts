import { RoleType } from '@/constant'
import { prisma } from '@/lib/prisma'
import { repos } from '@/utils/mock'
import { v4 as uuidv4 } from 'uuid'

export const mockUpsertMemo = (userId: string, memo: string, index: number) => {
  const user = repos.users.find((e) => e.id === userId)

  if (!user) {
    return {
      status: 401,
      data: null,
    }
  }

  repos.memos.push({
    id: uuidv4(),
    memo,
    index,
    userId,
    user: {
      role: user.role,
      createdAt: '',
      createdBy: '',
      email: '',
      id: '',
      password: '',
      updatedAt: '',
      updatedBy: '',
      username: '',
    },
    createdBy: user.username,
    updatedBy: user.username,
    createdAt: String(new Date().getTime()),
    updatedAt: String(new Date().getTime()),
  })

  return {
    data: '',
    status: 200,
  }
}
