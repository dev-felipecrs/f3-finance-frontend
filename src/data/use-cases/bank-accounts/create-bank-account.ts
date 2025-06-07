import {
  UseCaseAuthDecorator,
  UseCaseErrorHandlerDecorator,
} from '@/presentation/decorators'
import { ICreateBankAccountUseCase } from '@/domain/use-cases/bank-accounts'
import { Bank } from '@/domain/entities'
import { HttpClient } from '@/data/protocols/http'

type CreateBankAccountReturn = {
  bank_account_id: string
  name: string
  bank: Bank
  agency_number: string
  account_number: string
  transactions: []
  created_at: Date
  updated_at: Date
}

@UseCaseErrorHandlerDecorator()
@UseCaseAuthDecorator()
export class CreateBankAccountUseCase implements ICreateBankAccountUseCase {
  constructor(private readonly http: HttpClient) {}

  async execute(
    input: ICreateBankAccountUseCase.Input,
  ): Promise<HttpClient.Output<ICreateBankAccountUseCase.Output>> {
    const response = await this.http.on<CreateBankAccountReturn>({
      url: process.env.BASE_API_URL + `/bank-accounts`,
      method: 'POST',
      body: {
        name: input.name,
        bank: input.bank,
        agency_number: input.agencyNumber,
        account_number: input.accountNumber,
      },
      headers: {
        Authorization: input.Authorization,
      },
    })

    if (response.error || !response.data) {
      return {
        status: response.status,
        error: response.error,
      }
    }

    return {
      status: response.status,
      data: {
        bankAccountId: response.data.bank_account_id,
        name: response.data.name,
        bank: response.data.bank,
        agencyNumber: response.data.agency_number,
        accountNumber: response.data.account_number,
        transactions: response.data.transactions,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
      },
    }
  }
}
