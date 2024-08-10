import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'

const phoneRegex = /^\(?\d{2}\)?[\s-]?(\d{4,5})[\s-]?\d{4}$/

const signUpFormSchema = z.object({
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

type SignUpFormProps = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(signUpFormSchema),
    // defaultValues: {
    //   name: 'João da Silva',
    //   taxNumber: '12345678900',
    //   mail: 'joao@gmail.com',
    //   phone: '11999999999',
    //   password: '123456',
    // },
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!')
      navigate('/sign-in')
    },
    onError: () => toast.error('Usuário já cadastrado!'),
  })

  async function handleRegisterUser(formData: SignUpFormProps) {
    await registerUserFn(formData)
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <div>
        <Input
          label="CPF ou CNPJ"
          placeholder="Digite o CPF ou CNPJ"
          error={errors.taxNumber?.message}
          {...register('taxNumber')}
        />
        <Input
          label="E-mail"
          placeholder="email@exemplo.com"
          error={errors.mail?.message}
          {...register('mail')}
        />
        <Input
          label="Senha"
          placeholder="Digite sua senha (mínimo 6 caracteres)"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Telefone"
            placeholder="(DD) 00000-0000"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>
      </div>

      <Link
        to={'/sign-in'}
        className="text-right text-zinc-800 underline hover:opacity-95"
      >
        Já possui cadastro?
      </Link>

      <Button isLoading={isSubmitting} type="submit" size={'lg'}>
        Cadastrar
      </Button>
    </form>
  )
}
