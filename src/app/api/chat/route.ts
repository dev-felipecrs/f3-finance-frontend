import { cookies } from 'next/headers'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { openai } from '@ai-sdk/openai'

import { AUTHENTICATED_USER_COOKIE_KEY } from '@/presentation/constants'
import { makeFindAllTransactionsUseCase } from '@/infra/factories/transactions'
import { UserCookiePayload } from '@/domain/models'
import { TransactionType } from '@/domain/entities'

// Allow streaming responses up to 60 seconds (tool execution can take time)
export const maxDuration = 60

async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(AUTHENTICATED_USER_COOKIE_KEY)

  if (!authCookie?.value) {
    return null
  }

  try {
    const userPayload: UserCookiePayload = JSON.parse(authCookie.value)
    return userPayload.accessToken
  } catch {
    return null
  }
}

async function getTransactions(params: {
  year?: number
  month?: number
  transactionType?: TransactionType[]
  startDate?: string
  endDate?: string
}) {
  const token = await getAuthToken()

  if (!token) {
    throw new Error('Usuário não autenticado')
  }

  const findAllTransactionsUseCase = makeFindAllTransactionsUseCase()

  // Buscar todas as transações (vamos paginar se necessário)
  const allTransactions: Array<{
    transactionId: string
    bankAccountId: string
    amount: number
    transactionType: TransactionType
    transactedAt: Date
  }> = []

  let page = 1
  let hasMore = true
  const maxPages = 1000 // Limite de segurança para evitar loops infinitos

  while (hasMore && page <= maxPages) {
    const result = await findAllTransactionsUseCase.execute({
      page,
      pageSize: 999_999_999,
      filters: {
        ...(params.transactionType && {
          transaction_type: params.transactionType,
        }),
      },
      Authorization: `Bearer ${token}`,
    })

    if (result.error || !result.data) {
      throw new Error(result.error?.message || 'Erro ao buscar transações')
    }

    allTransactions.push(...result.data.pageResult)

    hasMore = page < result.data.totalPages
    page++

    // Log de progresso
    if (page % 10 === 0) {
      console.log(
        `Buscando transações: página ${page}/${result.data.totalPages}`,
      )
    }
  }

  if (page > maxPages) {
    console.warn(
      `Limite de páginas atingido. Total de transações carregadas: ${allTransactions.length}`,
    )
  }

  // Filtrar por data se fornecido
  let filtered = allTransactions

  // Função helper para converter transactedAt para Date
  const getTransactionDate = (transactedAt: Date | string): Date => {
    if (transactedAt instanceof Date) {
      return transactedAt
    }
    return new Date(transactedAt)
  }

  // Se temos startDate e endDate, usamos eles (têm prioridade)
  if (params.startDate && params.endDate) {
    const start = new Date(params.startDate)
    start.setHours(0, 0, 0, 0)
    const end = new Date(params.endDate)
    end.setHours(23, 59, 59, 999)
    filtered = filtered.filter((t) => {
      const date = getTransactionDate(t.transactedAt)
      return date >= start && date <= end
    })
  } else {
    // Caso contrário, usamos year e month
    if (params.year) {
      filtered = filtered.filter((t) => {
        const date = getTransactionDate(t.transactedAt)
        const matchesYear = date.getFullYear() === params.year

        // Se month também foi fornecido, filtrar por ambos
        if (params.month !== undefined && params.month !== null) {
          return matchesYear && date.getMonth() === params.month
        }

        return matchesYear
      })
    } else if (params.month !== undefined && params.month !== null) {
      // Se só temos month, usar o ano atual
      const currentYear = new Date().getFullYear()
      filtered = filtered.filter((t) => {
        const date = getTransactionDate(t.transactedAt)
        return (
          date.getFullYear() === currentYear && date.getMonth() === params.month
        )
      })
    }

    // Aplicar startDate se fornecido (sem endDate)
    if (params.startDate && !params.endDate) {
      const start = new Date(params.startDate)
      start.setHours(0, 0, 0, 0)
      filtered = filtered.filter(
        (t) => getTransactionDate(t.transactedAt) >= start,
      )
    }

    // Aplicar endDate se fornecido (sem startDate)
    if (params.endDate && !params.startDate) {
      const end = new Date(params.endDate)
      end.setHours(23, 59, 59, 999)
      filtered = filtered.filter(
        (t) => getTransactionDate(t.transactedAt) <= end,
      )
    }
  }

  return filtered
}

export async function POST(req: Request): Promise<Response> {
  try {
    // Verificar se a chave da API está configurada
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY não está configurada')
      return new Response(
        JSON.stringify({
          error: 'Chave da API não configurada',
          details: 'Configure a variável de ambiente OPENAI_API_KEY',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const { messages }: { messages: UIMessage[] } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Mensagens inválidas' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Buscar todas as transações do usuário
    console.log('Buscando todas as transações do usuário...')
    let allTransactions: Array<{
      transactionId: string
      bankAccountId: string
      amount: number
      transactionType: TransactionType
      transactedAt: Date
    }> = []

    try {
      const token = await getAuthToken()
      if (token) {
        allTransactions = await getTransactions({})
        console.log(`Total de transações carregadas: ${allTransactions.length}`)
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error)
      // Continuar mesmo se houver erro, mas sem dados de transações
    }

    // Calcular totais
    const totalIncome = allTransactions
      .filter((t) => t.transactionType === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = allTransactions
      .filter((t) => t.transactionType === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0)

    const totalBalance = totalIncome - totalExpense

    // Limitar transações para evitar exceder limite de tokens
    // Ordenar por data (mais recentes primeiro) e pegar as últimas 1000
    const sortedTransactions = [...allTransactions].sort((a, b) => {
      const dateA = new Date(a.transactedAt).getTime()
      const dateB = new Date(b.transactedAt).getTime()
      return dateB - dateA // Mais recentes primeiro
    })

    // Criar resumo por período (últimos 12 meses) para economizar tokens
    const currentDate = new Date()
    const byPeriod: Record<
      string,
      { income: number; expense: number; count: number }
    > = {}

    // Criar resumo por horário (horário local do Brasil - UTC-3)
    const byHour: Record<number, number> = {}
    for (let i = 0; i < 24; i++) {
      byHour[i] = 0
    }

    allTransactions.forEach((t) => {
      const date = new Date(t.transactedAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${String(month).padStart(2, '0')}`

      // Apenas últimos 12 meses
      const monthsDiff =
        (currentDate.getFullYear() - year) * 12 +
        (currentDate.getMonth() + 1 - month)
      if (monthsDiff > 12) return

      if (!byPeriod[key]) {
        byPeriod[key] = { income: 0, expense: 0, count: 0 }
      }

      if (t.transactionType === TransactionType.INCOME) {
        byPeriod[key].income += t.amount
      } else {
        byPeriod[key].expense += t.amount
      }
      byPeriod[key].count++

      // Agregar por horário (apenas despesas, horário local do Brasil)
      if (t.transactionType === TransactionType.EXPENSE) {
        // Usar métodos locais do Date para pegar o horário local
        const date = new Date(t.transactedAt)
        const hour = date.getHours() // getHours() retorna o horário local
        byHour[hour] = (byHour[hour] || 0) + t.amount
      }
    })

    // Enviar JSON minimizado: resumo + transações recentes limitadas
    const transactionsData = JSON.stringify(
      sortedTransactions.map((t) => {
        const date = new Date(t.transactedAt)
        return {
          a: Number(t.amount.toFixed(2)),
          t: t.transactionType === TransactionType.INCOME ? 'i' : 'e',
          d: date.toISOString(),
        }
      }),
    )

    const summaryData = JSON.stringify({
      total: {
        balance: Number(totalBalance.toFixed(2)),
        income: Number(totalIncome.toFixed(2)),
        expense: Number(totalExpense.toFixed(2)),
        count: allTransactions.length,
      },
      byPeriod: Object.entries(byPeriod).reduce(
        (acc, [key, value]) => {
          acc[key] = {
            i: Number(value.income.toFixed(2)),
            e: Number(value.expense.toFixed(2)),
            p: Number((value.income - value.expense).toFixed(2)),
            c: value.count,
          }
          return acc
        },
        {} as Record<string, { i: number; e: number; p: number; c: number }>,
      ),
      byHour: Object.entries(byHour).reduce(
        (acc, [hour, total]) => {
          acc[hour] = Number(total.toFixed(2))
          return acc
        },
        {} as Record<string, number>,
      ),
    })

    console.log('Iniciando streamText com', messages.length, 'mensagens')

    const result = streamText({
      model: openai('gpt-4o'),
      system: `Você é um assistente financeiro especializado em ajudar pessoas a gerenciar suas finanças pessoais.

Você tem acesso aos dados financeiros do usuário. Use as informações abaixo para responder perguntas sobre receitas, despesas, lucros e análises financeiras.

RESUMO FINANCEIRO:
${summaryData}

TRANSAÇÕES RECENTES:
${transactionsData}

ESTRUTURA DO RESUMO:
- "total": {balance: saldo total, income: receitas totais, expense: despesas totais, count: total de transações}
- "byPeriod": {"ANO-MÊS": {i: receitas, e: despesas, p: lucro, c: contagem}} - últimos 12 meses
- "byHour": {"0" a "23": valor total de despesas} - gastos por horário do dia (horário local do Brasil, 0h = meia-noite, 23h = 23:00)

ESTRUTURA DAS TRANSAÇÕES:
Cada transação é um objeto: {a: valor, t: tipo, d: data}
- "a": amount (valor da transação)
- "t": type - "i" = income (receita), "e" = expense (despesa)
- "d": date (data e horário no formato ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ)
  Exemplo: "2025-01-15T14:30:00.000Z" = 15 de janeiro de 2025 às 14:30 (horário UTC)

INSTRUÇÕES:
1. Use o resumo financeiro para responder perguntas sobre totais gerais
2. Use as transações recentes para análises detalhadas ou quando precisar de dados específicos por data
3. Para filtrar por data ou horários, use o campo "d" das transações (formato ISO 8601)
4. Quando o usuário perguntar sobre "esse ano", use o resumo "byPeriod" para o ano ${new Date().getFullYear()} ou filtre transações onde d começa com "${new Date().getFullYear()}"
5. Quando perguntar sobre "esse mês", use o resumo "byPeriod" para o mês atual ou filtre transações do mês atual
6. Para "primeiro trimestre", some os dados de janeiro, fevereiro e março do ano atual do resumo "byPeriod" ou filtre transações onde d contém "-01-", "-02-" ou "-03-"
7. Para análises de horário (ex: "Qual é o horário que temos mais gastos?"):
   - USE O RESUMO "byHour" que já está pré-calculado com os gastos por horário (horário local do Brasil)
   - O resumo "byHour" contém as chaves "0" a "23" representando as horas do dia (0h = meia-noite, 23h = 23:00)
   - Identifique a chave (hora) com o maior valor no resumo "byHour"
   - Responda com o horário no formato brasileiro (ex: "14h" ou "14:00")
   - NÃO precisa converter fuso horário - o resumo já está no horário local do Brasil
8. Para cálculos: 
   - Receitas = soma de todas as transações onde t="i"
   - Despesas = soma de todas as transações onde t="e"
   - Lucro/Saldo = receitas - despesas
9. Sempre formate valores em reais: R$ X.XXX,XX
10. Use os dados fornecidos acima para responder - não invente números
11. Se não houver dados para o período solicitado, informe claramente
12. Para calcular saldo de um período, some todas as receitas (t="i") e subtraia todas as despesas (t="e") do período


Seja educado, claro e objetivo. Responda em português brasileiro.`,
      messages: convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Erro no chat:', error)
    return new Response(
      JSON.stringify({
        error: 'Erro ao processar a mensagem',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
