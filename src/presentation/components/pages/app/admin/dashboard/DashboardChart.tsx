"use client"

import React from 'react'

import dynamic from 'next/dynamic'

import { TransactionType } from '@/domain/entities'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any

export interface DashboardTransactionDTO {
  amount: number
  transactionType: TransactionType
  transactedAt: string
}

type Period = '3m' | '6m' | '12m'

function filterByPeriod(transactions: DashboardTransactionDTO[], period: Period) {
  const now = new Date()
  const start = new Date(now)
  if (period === '3m') start.setMonth(start.getMonth() - 3)
  if (period === '6m') start.setMonth(start.getMonth() - 6)
  if (period === '12m') start.setMonth(start.getMonth() - 12)
  return transactions.filter((t) => new Date(t.transactedAt) >= start)
}

function groupMonthly(transactions: DashboardTransactionDTO[], months: number) {
  const now = new Date()
  const labels: string[] = []
  const keys: string[] = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('pt-BR', {
      month: 'short',
      year: '2-digit',
    })
    keys.push(key)
    labels.push(label)
  }
  const income: number[] = Array(keys.length).fill(0)
  const expense: number[] = Array(keys.length).fill(0)
  const net: number[] = Array(keys.length).fill(0)

  for (const t of transactions) {
    const d = new Date(t.transactedAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
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
}: {
  initialTransactions: DashboardTransactionDTO[]
}) {
  const [transactions] = React.useState(initialTransactions)

  const [donutPeriod, setDonutPeriod] = React.useState<Period>('12m')
  const [areaPeriod, setAreaPeriod] = React.useState<Period>('12m')
  const [barPeriod, setBarPeriod] = React.useState<Period>('12m')
  const [boxPeriod, setBoxPeriod] = React.useState<Period>('12m')

  const donutFiltered = filterByPeriod(transactions, donutPeriod)
  const areaMonths = areaPeriod === '12m' ? 12 : areaPeriod === '6m' ? 6 : 3
  const barMonths = barPeriod === '12m' ? 12 : barPeriod === '6m' ? 6 : 3
  const boxMonths = boxPeriod === '12m' ? 12 : boxPeriod === '6m' ? 6 : 3

  const { income: donutIncome, expense: donutExpense } = groupMonthly(
    donutFiltered,
    12,
  )
  const incomeTotal = donutIncome.reduce((a, b) => a + b, 0)
  const expenseTotal = donutExpense.reduce((a, b) => a + b, 0)

  const areaFiltered = filterByPeriod(transactions, areaPeriod)
  const { labels: areaLabels, net: areaNet } = groupMonthly(
    areaFiltered,
    areaMonths,
  )

  const barFiltered = filterByPeriod(transactions, barPeriod)
  const { labels: barLabels, income: barIncome, expense: barExpense } = groupMonthly(
    barFiltered,
    barMonths,
  )

  const boxFiltered = filterByPeriod(transactions, boxPeriod)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">Visão Geral</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Receitas vs Despesas</h3>
            <div className="flex items-center gap-2">
              {(['3m', '6m', '12m'] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDonutPeriod(p)}
                  className={`rounded-md border px-2 py-0.5 text-xs ${
                    donutPeriod === p
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
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Saldo por mês</h3>
            <div className="flex items-center gap-2">
              {(['3m', '6m', '12m'] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAreaPeriod(p)}
                  className={`rounded-md border px-2 py-0.5 text-xs ${
                    areaPeriod === p
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
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Receitas e Despesas por mês</h3>
            <div className="flex items-center gap-2">
              {(['3m', '6m', '12m'] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setBarPeriod(p)}
                  className={`rounded-md border px-2 py-0.5 text-xs ${
                    barPeriod === p
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
            type="bar"
            height={360}
            options={{
              chart: { stacked: true, toolbar: { show: false } },
              xaxis: { categories: barLabels },
              colors: ['#10b981', '#ef4444'],
              dataLabels: { enabled: false },
              legend: { position: 'bottom' },
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

        <div className="rounded-lg border border-gray-200 bg-white p-4 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Distribuição de valores</h3>
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
                      .filter((t) => t.transactionType === TransactionType.INCOME)
                      .map((t) => t.amount)
                      .sort((a, b) => a - b)
                    if (vals.length === 0) return { x: 'Receitas', y: [0, 0, 0, 0, 0] }
                    const q1 = vals[Math.floor(vals.length * 0.25)]
                    const q2 = vals[Math.floor(vals.length * 0.5)]
                    const q3 = vals[Math.floor(vals.length * 0.75)]
                    return { x: 'Receitas', y: [vals[0], q1, q2, q3, vals[vals.length - 1]] }
                  })(),
                  (() => {
                    const vals = boxFiltered
                      .filter((t) => t.transactionType === TransactionType.EXPENSE)
                      .map((t) => t.amount)
                      .sort((a, b) => a - b)
                    if (vals.length === 0) return { x: 'Despesas', y: [0, 0, 0, 0, 0] }
                    const q1 = vals[Math.floor(vals.length * 0.25)]
                    const q2 = vals[Math.floor(vals.length * 0.5)]
                    const q3 = vals[Math.floor(vals.length * 0.75)]
                    return { x: 'Despesas', y: [vals[0], q1, q2, q3, vals[vals.length - 1]] }
                  })(),
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}


