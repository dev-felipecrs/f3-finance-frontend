"use client";
import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button, Input } from "@/presentation/components/shared";
import { revalidatePage } from "@/presentation/actions/revalidate-page";

const LoginSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas precisam ser iguais'
});
export function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { handleSubmit, register, formState, watch } = useForm<
    z.infer<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
  });
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    await fetch("auth/user/reset-password", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        password: data.password,
      }),
    });
    await revalidatePage("/app");

    router.push("/app");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-8"
    >
      <Input.Root>
        <Input.Label htmlFor="password">Senha</Input.Label>

        <Input.Input
          id="password"
          type="password"
          placeholder="SuaSenha#123"
          {...register("password")}
        />
        <Input.Description>
          Mínimo de 8 caracteres, com uma letra maiúscula, minúscula, número e
          caracter especial
        </Input.Description>
        <Input.PasswordStrength value={passwordValue}></Input.PasswordStrength>

        {formState.errors.password && (
          <Input.ErrorMessage>
            {formState.errors.password.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Input.Root>
        <Input.Label htmlFor="password">Confirme sua senha</Input.Label>

        <Input.Input
          id="confirmPassword"
          type="password"
          placeholder="SuaSenha#123"
          {...register("confirmPassword")}
        />

        {formState.errors.confirmPassword && (
          <Input.ErrorMessage>
            {formState.errors.confirmPassword.message}
          </Input.ErrorMessage>
        )}
      </Input.Root>

      <Button.Root type="submit" isLoading={formState.isSubmitting}>
        <Button.Text>Entrar</Button.Text>
      </Button.Root>
    </form>
  );
}
