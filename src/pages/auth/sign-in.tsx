import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { login } from '@/api/login'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'

const signInFormSchema = z.object({
  taxNumber: z
    .string()
    .min(11, { message: 'CPF ou CNPJ inválido' })
    .max(14, { message: 'CPF ou CNPJ inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha inválida (mínimo 6 caracteres)' }),
})

type SignInFormProps = z.infer<typeof signInFormSchema>

export function SignIn() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(signInFormSchema),
  })

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('@t-alpha:token', data.token)
        toast.success('Login realizado com sucesso.')
        navigate('/')
      }
    },
    onError: () => toast.error('Credenciais inválidas.'),
  })

  async function handleSignIn(data: SignInFormProps) {
    await loginFn(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
      <div>
        <Input
          label="CPF ou CNPJ"
          placeholder="Digite o CPF ou CNPJ"
          error={errors.taxNumber?.message}
          {...register('taxNumber')}
        />
        <Input
          label="Senha"
          placeholder="*********"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      <Link
        to={'/sign-up'}
        className="text-right text-zinc-800 underline hover:opacity-95"
      >
        Não possui cadastro?
      </Link>

      <Button type="submit" isLoading={isSubmitting} size={'lg'}>
        Entrar
      </Button>
    </form>
  )
}
