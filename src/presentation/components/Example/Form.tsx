'use client'

import React from 'react'

import { User } from '@phosphor-icons/react'

import { Input } from '../shared'

export function FormExample() {
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')

  return (
    <div className="m-auto flex w-[496px] flex-col">
      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>

        <Input.Input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          iconPosition="left"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input.PasswordStrength value={password} />

        <Input.Description>
          A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas,
          minúsculas, números e caracteres especiais.
        </Input.Description>
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="username">Nome de usuário</Input.Label>
        <Input.Input
          id="username"
          placeholder="Digite seu nome de usuário"
          icon={<User className="text-muted-foreground h-4 w-4" />}
          iconPosition="left"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Description>
          Seu nome de usuário será visível para outros usuários.
        </Input.Description>
      </Input.Root>
    </div>
  )
}
