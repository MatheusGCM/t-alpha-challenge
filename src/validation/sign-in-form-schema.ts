import { z } from 'zod'

export const signInFormSchema = z.object({
  taxNumber: z
    .string()
    .min(11, { message: 'CPF ou CNPJ inválido' })
    .max(14, { message: 'CPF ou CNPJ inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha inválida (mínimo 6 caracteres)' }),
})
