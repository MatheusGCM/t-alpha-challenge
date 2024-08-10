import { z } from 'zod'

const phoneRegex = /^\(?\d{2}\)?[\s-]?(\d{4,5})[\s-]?\d{4}$/

export const signUpFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome inválido (mínimo 3 caracteres)' }),
  mail: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha inválida (mínimo 6 caracteres)' }),
  taxNumber: z
    .string()
    .min(11, { message: 'CPF ou CNPJ inválido' })
    .max(14, { message: 'CPF ou CNPJ inválido' }),
  phone: z.string().refine((phone) => phoneRegex.test(phone), {
    message: 'Telefone inválido',
  }),
})
