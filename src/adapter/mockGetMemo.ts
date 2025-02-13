import { RoleType } from '@/constant'
import { repos } from '@/utils/mock'

export const mockGetMemo = (userId: string) => {
  const user = repos.users.find((e) => e.id === userId)

  if (!user) {
    return {
      status: 401,
      data: null,
    }
  }
  const roleAdmin: RoleType = 'ADMIN'
  const isAdmin = user?.role === roleAdmin

  const memos = isAdmin
    ? repos.memos.sort((a, b) => {
        return Number(b.createdAt) - Number(a.createdAt)
      })
    : repos.memos
        .filter((e) => e.userId === userId)
        .sort((a, b) => {
          return Number(a.createdAt) - Number(b.createdAt)
        })

  return {
    data: memos,
    status: 200,
  }
}
