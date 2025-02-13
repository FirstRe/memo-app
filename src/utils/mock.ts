import { IMemoResponse } from '@/types/api/memo/interface'

export interface IUser {
  id: string
  username: string
  email: string
  role: string
  password?: string | null
  token?: string
}

const users: IUser[] = [
  {
    id: '40b079c3-cdaa-4356-82ce-178fe9d72951',
    username: 'A0001',
    email: 'admin@balerion.co.th',
    role: 'ADMIN',
    password: 'admin',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwYjA3OWMzLWNkYWEtNDM1Ni04MmNlLTE3OGZlOWQ3Mjk1MSIsIm5hbWUiOiJBMDAwMSIsImVtYWlsIjoiYWRtaW5AYmFsZXJpb24uY28udGgiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Mzk0NzExOTN9.n9GhNDpxt2NfITypnjgpy1vkiZi8NDQ9fW8qiF0nQRw',
  },
  {
    id: '4218271b-b491-4878-8845-155737da0684',
    username: 'U0001',
    email: 'USER@balerion.co.th',
    role: 'USER',
    password: 'user',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyMTgyNzFiLWI0OTEtNDg3OC04ODQ1LTE1NTczN2RhMDY4NCIsIm5hbWUiOiJVMDAwMSIsImVtYWlsIjoiVVNFUkBiYWxlcmlvbi5jby50aCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM5NDcxMjUwfQ.atw_md8GwsbezlYv65t9KzaSjLcO4H2BUwIsyeIcFGU',
  },
]

const memos: IMemoResponse[] = [
  {
    id: 'db224ec7-078f-4410-a3c9-8f89dcbdc178',
    memo: '1All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
    index: 1,
    userId: '40b079c3-cdaa-4356-82ce-178fe9d72951',
    user: {
      role: 'ADMIN',
      createdAt: '',
      createdBy: '',
      email: '',
      id: '',
      password: '',
      updatedAt: '',
      updatedBy: '',
      username: '',
    },
    createdBy: 'A0001',
    updatedBy: 'A0001',
    createdAt: '1739463912280',
    updatedAt: '1739463912280',
  },
  {
    id: 'f6becdd4-2b56-4bf7-8fe4-0ee5f16d3f0f',
    memo: '2All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
    index: 2,
    userId: '40b079c3-cdaa-4356-82ce-178fe9d72951',
    user: {
      role: 'ADMIN',
      createdAt: '',
      createdBy: '',
      email: '',
      id: '',
      password: '',
      updatedAt: '',
      updatedBy: '',
      username: '',
    },
    createdBy: 'A0001',
    updatedBy: 'A0001',
    createdAt: '1739463929888',
    updatedAt: '1739463929888',
  },
  {
    id: 'c1512f01-ee79-4a8d-8749-adba6352a23d',
    memo: '1All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
    index: 1,
    userId: '4218271b-b491-4878-8845-155737da0684',
    user: {
      role: 'USER',
      createdAt: '',
      createdBy: '',
      email: '',
      id: '',
      password: '',
      updatedAt: '',
      updatedBy: '',
      username: '',
    },
    createdBy: 'U0001',
    updatedBy: 'u0001',
    createdAt: '1739471326052',
    updatedAt: '1739471326052',
  },
]
export const repos = {
  users,
  memos,
}
