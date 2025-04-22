import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { getCookie } from '@/presentation/actions'
import { UserCookiePayload } from '@/domain/models'

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

      const accessToken = authOptions.accessToken

      // TODO: implement refresh token

      args[0].Authorization = `Bearer ${accessToken}`

      return await originalMethod.apply(this, args)
    }
  }
}
