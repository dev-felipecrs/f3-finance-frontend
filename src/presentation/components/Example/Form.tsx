'use client'

import React from 'react'

import { User } from '@phosphor-icons/react'

import {
  Input,
  InputDescription,
  InputLabel,
  InputPasswordStrength,
  InputRoot,
} from '../shared'

export function FormExample() {
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')

  return (
    <div className="m-auto flex w-[496px] flex-col">
      <InputRoot>
        <InputLabel htmlFor="password">Senha</InputLabel>

        <Input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          iconPosition="left"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputPasswordStrength value={password} />

        <InputDescription>
          A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas,
          minúsculas, números e caracteres especiais.
        </InputDescription>
      </InputRoot>

      <InputRoot>
        <InputLabel htmlFor="username">Nome de usuário</InputLabel>
        <Input
          id="username"
          placeholder="Digite seu nome de usuário"
          icon={<User className="text-muted-foreground h-4 w-4" />}
          iconPosition="left"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputDescription>
          Seu nome de usuário será visível para outros usuários.
        </InputDescription>
      </InputRoot>
    </div>
  )
}
