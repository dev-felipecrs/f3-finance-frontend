'use client'

import React from 'react'

import dynamic from 'next/dynamic'

import { Button, Input, Select } from '@/presentation/components/shared'
import { DateFnsAdapter } from '@/infra/date'
import { BankAccount, TransactionType } from '@/domain/entities'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
}) as any

const dateAdapter = new DateFnsAdapter()

export interface DashboardTransactionDTO {
  amount: number
  transactionType: TransactionType
  transactedAt: string
  bankAccountId: string
}

function filterByLast12Months(transactions: DashboardTransactionDTO[]) {
  const now = new Date()
  const start = dateAdapter.sub(now, { months: 12 })

  return transactions.filter(
    (t) =>
      dateAdapter.isAfter(new Date(t.transactedAt), start) ||
      new Date(t.transactedAt).getTime() === start.getTime(),
  )
}

function filterByDateRange(
  transactions: DashboardTransactionDTO[],
  startDate: Date | null,
  endDate: Date | null,
) {
  if (!startDate && !endDate) return transactions

  return transactions.filter((t) => {
    const transactionDate = new Date(t.transactedAt)
    if (startDate && endDate) {
      return transactionDate >= startDate && transactionDate <= endDate
    }
    if (startDate) {
      return transactionDate >= startDate
    }
    if (endDate) {
      return transactionDate <= endDate
    }
    return true
  })
}

function filterByBankAccount(
  transactions: DashboardTransactionDTO[],
  bankAccountId: string | null,
) {
  if (!bankAccountId) return transactions
  return transactions.filter((t) => t.bankAccountId === bankAccountId)
}

function groupMonthly(transactions: DashboardTransactionDTO[], months: number) {
  const now = new Date()
  const labels: string[] = []
  const keys: string[] = []
  for (let i = months - 1; i >= 0; i--) {
    const monthStart = dateAdapter.startOfMonth(
      dateAdapter.sub(now, { months: i }),
    )
    const key = dateAdapter.format(monthStart, 'yyyy-MM')
    const label = dateAdapter.format(monthStart, 'MMM/yy')
    keys.push(key)
    labels.push(label)
  }
  const income: number[] = Array(keys.length).fill(0)
  const expense: number[] = Array(keys.length).fill(0)
  const net: number[] = Array(keys.length).fill(0)

  for (const t of transactions) {
    const transactionDate = new Date(t.transactedAt)
    const key = dateAdapter.format(transactionDate, 'yyyy-MM')
    const idx = keys.indexOf(key)
    if (idx === -1) continue
    if (t.transactionType === TransactionType.INCOME) {
      income[idx] += t.amount
      net[idx] += t.amount
    } else {
      expense[idx] += t.amount
      net[idx] -= t.amount
    }
  }

  return { labels, income, expense, net }
}

export function DashboardCharts({
  initialTransactions,
  initialBankAccounts,
  initialTotalCount,
}: {
  initialTransactions: DashboardTransactionDTO[]
  initialBankAccounts: BankAccount[]
  initialTotalCount: number
}) {
  const [transactions] = React.useState(initialTransactions)
  const [bankAccounts] = React.useState(initialBankAccounts)
  const [totalCount] = React.useState(initialTotalCount)

  // Filtros globais
  const [startDate, setStartDate] = React.useState<string>('')
  const [endDate, setEndDate] = React.useState<string>('')
  const [selectedBankAccountId, setSelectedBankAccountId] = React.useState<
    string | null
  >(null)

  // Aplicar filtros globais
  let filteredTransactions = transactions
  filteredTransactions = filterByDateRange(
    filteredTransactions,
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  )
  filteredTransactions = filterByBankAccount(
    filteredTransactions,
    selectedBankAccountId,
  )

  // Calcular KPIs
  const totalIncome = filteredTransactions
    .filter((t) => t.transactionType === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = filteredTransactions
    .filter((t) => t.transactionType === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  // Se há filtros aplicados, usar o count das transações filtradas
  // Caso contrário, usar o totalCount inicial da API
  const hasFilters = startDate || endDate || selectedBankAccountId
  const totalTransactions = hasFilters
    ? filteredTransactions.length
    : (totalCount ?? transactions.length)

  // Dados para gráficos (sempre últimos 12 meses)
  const donutFiltered = filterByLast12Months(filteredTransactions)
  const { income: donutIncome, expense: donutExpense } = groupMonthly(
    donutFiltered,
    12,
  )
  const incomeTotal = donutIncome.reduce((a, b) => a + b, 0)
  const expenseTotal = donutExpense.reduce((a, b) => a + b, 0)

  const areaFiltered = filterByLast12Months(filteredTransactions)
  const { labels: areaLabels, net: areaNet } = groupMonthly(areaFiltered, 12)

  const barFiltered = filterByLast12Months(filteredTransactions)
  const {
    labels: barLabels,
    income: barIncome,
    expense: barExpense,
  } = groupMonthly(barFiltered, 12)

  // Gráfico de distribuição por conta bancária
  const bankAccountData = bankAccounts.map((account) => {
    const accountTransactions = filteredTransactions.filter(
      (t) => t.bankAccountId === account.bankAccountId,
    )
    const accountIncome = accountTransactions
      .filter((t) => t.transactionType === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0)
    const accountExpense = accountTransactions
      .filter((t) => t.transactionType === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      name: account.name,
      income: accountIncome,
      expense: accountExpense,
      net: accountIncome - accountExpense,
    }
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-4 text-sm font-medium text-gray-500">Filtros</h3>
        <div className="flex flex-wrap items-end gap-4">
          <Input.Root className="min-w-[200px] flex-1">
            <Input.Label htmlFor="startDate">Data Inicial</Input.Label>
            <Input.Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Input.Root>

          <Input.Root className="min-w-[200px] flex-1">
            <Input.Label htmlFor="endDate">Data Final</Input.Label>
            <Input.Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Input.Root>

          <Select.Root className="min-w-[200px] flex-1">
            <Select.Label htmlFor="bankAccount">Conta Bancária</Select.Label>
            <Select.Field
              inputId="bankAccount"
              placeholder="Todas as contas"
              isClearable
              options={bankAccounts.map((account) => ({
                value: account.bankAccountId,
                label: account.name,
              }))}
              value={
                selectedBankAccountId
                  ? {
                      value: selectedBankAccountId,
                      label:
                        bankAccounts.find(
                          (a) => a.bankAccountId === selectedBankAccountId,
                        )?.name || '',
                    }
                  : null
              }
              onChange={(option: any) =>
                setSelectedBankAccountId(option?.value || null)
              }
            />
          </Select.Root>

          {(startDate || endDate || selectedBankAccountId) && (
            <Button.Root
              type="button"
              onClick={() => {
                setStartDate('')
                setEndDate('')
                setSelectedBankAccountId(null)
              }}
              className="h-14"
            >
              <Button.Text>Limpar Filtros</Button.Text>
            </Button.Root>
          )}
        </div>
      </div>

      {/* Cards de KPI */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Receitas
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(totalIncome)}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Despesas
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(totalExpense)}
              </p>
            </div>
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo</p>
              <p
                className={`mt-2 text-2xl font-bold ${
                  balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(balance)}
              </p>
            </div>
            <div
              className={`rounded-full p-3 ${
                balance >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <svg
                className={`h-6 w-6 ${
                  balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    balance >= 0
                      ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                  }
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Transações
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {totalTransactions.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="rounded-full bg-indigo-100 p-3">
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Receitas vs Despesas
            </h3>
          </div>
          <ReactApexChart
            type="donut"
            height={320}
            options={{
              chart: { toolbar: { show: false } },
              labels: ['Receitas', 'Despesas'],
              colors: ['#10b981', '#ef4444'],
              legend: { position: 'bottom' },
              dataLabels: { enabled: true },
              tooltip: {
                y: {
                  formatter: (val: number) =>
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(val),
                },
              },
              stroke: { width: 0 },
            }}
            series={[incomeTotal, expenseTotal]}
          />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Saldo por mês</h3>
          </div>
          <ReactApexChart
            type="area"
            height={320}
            options={{
              chart: { toolbar: { show: false } },
              xaxis: { categories: areaLabels },
              dataLabels: { enabled: false },
              stroke: { curve: 'smooth', width: 2 },
              colors: ['#6366f1'],
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.35,
                  opacityTo: 0,
                  stops: [0, 90, 100],
                },
              },
              yaxis: {
                labels: {
                  formatter: (val: number) =>
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(val),
                },
              },
              tooltip: {
                y: {
                  formatter: (val: number) =>
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(val),
                },
              },
            }}
            series={[{ name: 'Saldo', data: areaNet }]}
          />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 md:col-span-2">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Receitas e Despesas por mês
            </h3>
          </div>
          <ReactApexChart
            type="bar"
            height={360}
            options={{
              chart: { stacked: true, toolbar: { show: false } },
              xaxis: { categories: barLabels },
              colors: ['#10b981', '#ef4444'],
              dataLabels: { enabled: false },
              legend: { position: 'bottom' },
              yaxis: {
                labels: {
                  formatter: (val: number) =>
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(val),
                },
              },
              tooltip: {
                y: {
                  formatter: (val: number) =>
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(val),
                },
              },
            }}
            series={[
              { name: 'Receitas', data: barIncome },
              { name: 'Despesas', data: barExpense.map((v) => -v) },
            ]}
          />
        </div>

        {/* Gráfico de distribuição por conta bancária */}
        {bankAccounts.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-4 md:col-span-2">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Distribuição por Conta Bancária
              </h3>
            </div>
            <ReactApexChart
              type="bar"
              height={320}
              options={{
                chart: { toolbar: { show: false } },
                xaxis: {
                  categories: bankAccountData.map((d) => d.name),
                },
                colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'],
                dataLabels: { enabled: false },
                legend: { position: 'bottom' },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '55%',
                  },
                },
                yaxis: {
                  labels: {
                    formatter: (val: number) =>
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 0,
                      }).format(val),
                  },
                },
                tooltip: {
                  y: {
                    formatter: (val: number) =>
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 0,
                      }).format(val),
                  },
                },
              }}
              series={[
                {
                  name: 'Receitas',
                  data: bankAccountData.map((d) => d.income),
                },
                {
                  name: 'Despesas',
                  data: bankAccountData.map((d) => d.expense),
                },
                {
                  name: 'Saldo',
                  data: bankAccountData.map((d) => d.net),
                },
              ]}
            />
          </div>
        )}

        {/* <div className="rounded-lg border border-gray-200 bg-white p-4 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Distribuição de valores
            </h3>
            <div className="flex items-center gap-2">
              {(['3m', '6m', '12m'] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setBoxPeriod(p)}
                  className={`rounded-md border px-2 py-0.5 text-xs ${
                    boxPeriod === p
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <ReactApexChart
            type="boxPlot"
            height={320}
            options={{
              chart: { toolbar: { show: false } },
              xaxis: { categories: ['Receitas', 'Despesas'] },
            }}
            series={[
              {
                name: 'Valores',
                data: [
                  (() => {
                    const vals = boxFiltered
                      .filter(
                        (t) => t.transactionType === TransactionType.INCOME,
                      )
                      .map((t) => t.amount)
                      .sort((a, b) => a - b)
                    if (vals.length === 0)
                      return { x: 'Receitas', y: [0, 0, 0, 0, 0] }
                    const q1 = vals[Math.floor(vals.length * 0.25)]
                    const q2 = vals[Math.floor(vals.length * 0.5)]
                    const q3 = vals[Math.floor(vals.length * 0.75)]
                    return {
                      x: 'Receitas',
                      y: [vals[0], q1, q2, q3, vals[vals.length - 1]],
                    }
                  })(),
                  (() => {
                    const vals = boxFiltered
                      .filter(
                        (t) => t.transactionType === TransactionType.EXPENSE,
                      )
                      .map((t) => t.amount)
                      .sort((a, b) => a - b)
                    if (vals.length === 0)
                      return { x: 'Despesas', y: [0, 0, 0, 0, 0] }
                    const q1 = vals[Math.floor(vals.length * 0.25)]
                    const q2 = vals[Math.floor(vals.length * 0.5)]
                    const q3 = vals[Math.floor(vals.length * 0.75)]
                    return {
                      x: 'Despesas',
                      y: [vals[0], q1, q2, q3, vals[vals.length - 1]],
                    }
                  })(),
                ],
              },
            ]}
          />
        </div> */}
      </div>
    </div>
  )
}
