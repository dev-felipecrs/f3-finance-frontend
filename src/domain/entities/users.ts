export type UserRole = 'admin' | 'user'

export interface User {
  userId: string

  email: string
  roles: UserRole[]

  createdAt: Date
  updatedAt: Date
}
