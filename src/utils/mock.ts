export interface IUser {
  id: string
  username: string
  email: string
  role: string
  password?: string | null
}

const users: IUser[] = [
  {
    id: '40b079c3-cdaa-4356-82ce-178fe9d72951',
    username: 'A0001',
    email: 'admin@balerion.co.th',
    role: 'ADMIN',
    password: 'admin',
  },
  {
    id: '4218271b-b491-4878-8845-155737da0684',
    username: 'U0001',
    email: 'jane@example.com',
    role: 'USER',
    password: 'user',
  },
]

export const repos = {
  users: users,
}
