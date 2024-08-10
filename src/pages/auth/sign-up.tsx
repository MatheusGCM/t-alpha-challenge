import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import { signUpFormSchema } from '@/validation/sign-up-form-schema'

type SignUpFormProps = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(signUpFormSchema),
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
