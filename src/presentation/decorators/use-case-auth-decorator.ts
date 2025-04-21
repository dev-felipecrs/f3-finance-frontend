import { setCookie } from 'cookies-next'

import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { getCookie } from '@/presentation/actions'
import { FetchAdapter } from '@/infra/http'
import { DateFnsAdapter } from '@/infra/date'
import { UserCookiePayload } from '@/domain/models'

type RefreshReturn = {
  access_token: string
  expires_in: number
}

export function UseCaseAuthDecorator() {
  return function (target: any) {
    const originalMethod = target.prototype.execute

    target.prototype.execute = async function (...args: any[]) {
      const { value: authOptions } = await getCookie<UserCookiePayload>(
        AUTHENTICATED_USER_COOKIE_KEY,
      )

      if (!authOptions) {
        return await originalMethod.apply(this, args)
      }

      let accessToken = authOptions.accessToken

      if (new Date(authOptions.expiredAt).getTime() < new Date().getTime()) {
        const { add } = new DateFnsAdapter()
        const http = new FetchAdapter()
        const response = await http.on<RefreshReturn>({
          url: process.env.BASE_API_URL + '/users-service/public/auth/refresh',
          method: 'POST',
          body: {
            refresh_token: authOptions.refreshToken,
          },
        })

        if (!response.data) {
          return await originalMethod.apply(this, args)
        }

        const authenticatedUserCookiePayload: UserCookiePayload = {
          userId: authOptions.userId,
          roles: authOptions.roles,
          accessToken: response.data.access_token,
          refreshToken: authOptions.refreshToken,
          expiredAt: add(new Date(), {
            seconds: response.data.expires_in,
          }),
        }

        setCookie(
          AUTHENTICATED_USER_COOKIE_KEY,
          authenticatedUserCookiePayload,
          {
            expires: add(new Date(), { months: 1 }),
          },
        )

        accessToken = response.data.access_token
      }

      args[0].accessToken = accessToken

      return await originalMethod.apply(this, args)
    }
  }
}
