export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  transactionId: string
  bankAccountId: string
  amount: number
  transactionType: TransactionType
  transactedAt: Date
  createdAt: Date
  updatedAt: Date
}
