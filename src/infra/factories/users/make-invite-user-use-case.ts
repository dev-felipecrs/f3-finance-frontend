import { FetchAdapter } from '@/infra/http'
import { InviteUserUseCase } from '@/data/use-cases/users'

export const makeInviteUserUseCase = () => {
  const httpClient = new FetchAdapter()
  const inviteUserUseCase = new InviteUserUseCase(httpClient)

  return inviteUserUseCase
}
