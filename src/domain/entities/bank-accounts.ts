export enum Bank {
  ITAU = 'itau',
  STONE = 'stone',
  BRADESCO = 'bradesco',
}

export interface BankAccount {
  bankAccountId: string

  name: string
  bank: Bank
  agencyNumber: string
  accountNumber: string
  transactions: []

  createdAt: Date
  updatedAt: Date
}
