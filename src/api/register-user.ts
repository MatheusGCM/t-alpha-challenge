import { api } from '@/lib/axios'

interface RegisterUserBody {
  name: string
  taxNumber: string
  mail: string
  phone: string
  password: string
}

export async function registerUser(body: RegisterUserBody) {
  await api.post('/auth/register', body)
}
