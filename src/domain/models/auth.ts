import { User } from '@/domain/entities'

export type UserCookiePayload = Pick<User, 'userId' | 'roles'> & {
  accessToken: string
  refreshToken: string
  expiredAt: Date
}
