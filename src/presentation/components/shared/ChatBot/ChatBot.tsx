'use client'

import React, { useEffect, useRef, useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { DefaultChatTransport } from 'ai'
import { ChatCircle, PaperPlaneTilt, X } from '@phosphor-icons/react'
import { useChat } from '@ai-sdk/react'

import { Dialog } from '../Dialog'
import { Button } from '../Button'

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (error) {
      console.error('Erro no chat:', error)
    }
  }, [error])

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput('')
  }

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
        aria-label="Abrir chat"
      >
        <ChatCircle size={28} weight="fill" />
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content
            title="Assistente Financeiro"
            className="flex h-[600px] w-full max-w-2xl flex-col p-0"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                fIA - Assistente Financeiro
              </h2>
              <Dialog.Close
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Fechar chat"
              >
                <X size={24} />
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {messages.length === 0 && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <ChatCircle
                      size={48}
                      weight="fill"
                      className="mx-auto mb-4 text-blue-600"
                    />
                    <p className="text-gray-600">
                      Olá, sou a fIA! Como posso ajudá-lo com suas finanças
                      hoje?
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Pergunte sobre receitas, despesas, valores em períodos
                      específicos e mais.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <div className="text-sm whitespace-pre-wrap">
                          {message.parts.map((part, index) =>
                            part.type === 'text' ? (
                              <span key={index}>{part.text}</span>
                            ) : null,
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-2 ml-4 list-disc space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-2 ml-4 list-decimal space-y-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-sm">{children}</li>
                              ),
                              code: ({ className, children, ...props }) => {
                                const isInline =
                                  !className || !className.includes('language-')
                                return isInline ? (
                                  <code
                                    className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs text-gray-800"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <code
                                    className="block rounded bg-gray-200 p-2 font-mono text-xs text-gray-800"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                )
                              },
                              pre: ({ children }) => (
                                <pre className="mb-2 overflow-x-auto rounded bg-gray-200 p-2 text-xs">
                                  {children}
                                </pre>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                              h1: ({ children }) => (
                                <h1 className="mb-2 text-base font-bold">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="mb-2 text-sm font-bold">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="mb-1 text-sm font-semibold">
                                  {children}
                                </h3>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="my-2 border-l-4 border-gray-300 pl-3 italic">
                                  {children}
                                </blockquote>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline hover:text-blue-800"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.parts
                              .filter((part) => part.type === 'text')
                              .map((part) => part.text)
                              .join('')}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 px-6 py-4"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Digite sua pergunta..."
                  disabled={isLoading}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
                />
                <Button.Root
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex items-center gap-2 disabled:cursor-not-allowed"
                >
                  <PaperPlaneTilt size={20} />
                  <span>Enviar</span>
                </Button.Root>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
