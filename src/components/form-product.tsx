import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from './input'

import { Product } from '@/@types/product'

const productDialogFormSchema = z.object({
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

export type ProductDialogFormData = z.infer<typeof productDialogFormSchema>

interface FormProductProps {
  product?: Product
  onSubmit: (formData: ProductDialogFormData) => void
}

export function FormProduct({ product, onSubmit }: FormProductProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductDialogFormData>({
    resolver: zodResolver(productDialogFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price,
      stock: product?.stock,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="formProduct">
      <Input
        label="Nome"
        error={errors.name?.message}
        placeholder="Nome do produto"
        {...register('name')}
      />
      <div>
        <label
          className="text-sm font-medium text-zinc-800"
          htmlFor="description"
        >
          Descrição
        </label>

        <textarea
          id="description"
          className={`flex min-h-[7.5rem] w-full resize-y items-center rounded-md border px-3 py-2 outline-none placeholder:text-zinc-400 focus:border-zinc-500 ${errors.description ? 'border-red-500' : 'border-zinc-200'} `}
          placeholder="Descrição do produto"
          {...register('description')}
        />
        <span className="block h-3 text-xs text-red-500">
          {errors.description?.message}
        </span>
      </div>
      <div className="flex gap-2">
        <Input
          label="Preço (R$)"
          error={errors.price?.message}
          placeholder="Preço do produto"
          {...register('price')}
        />
        <Input
          label="Estoque"
          error={errors.stock?.message}
          placeholder="Estoque do produto"
          {...register('stock')}
        />
      </div>
    </form>
  )
}
