import { z } from 'zod'

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter pelo menos 3 caracteres' }),
  description: z
    .string()
    .min(3, { message: 'A descrição deve conter pelo menos 3 caracteres' })
    .max(100, { message: 'A descrição deve conter no máximo 100 caracteres' }),
  price: z.coerce.number({ message: 'Valor inválido' }).nonnegative(),
  stock: z.coerce.number({ message: 'Valor inválido' }).nonnegative(),
})
